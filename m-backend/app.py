import os
import time
import requests
from fastapi import FastAPI
from pydantic import BaseModel

HF_TOKEN = os.getenv("HF_TOKEN")
MODEL_ID = "DPrajwalxI/madhubani-mindmate-lora"

API_URL = f"https://api-inference.huggingface.co/models/{MODEL_ID}"
HEADERS = {
    "Authorization": f"Bearer {HF_TOKEN}",
    "Content-Type": "application/json"
}

app = FastAPI()

class ChatRequest(BaseModel):
    message: str


def call_model(prompt: str):
    payload = {
        "inputs": prompt,
        "parameters": {
            "max_new_tokens": 120,
            "temperature": 0.7,
            "top_p": 0.9,
            "do_sample": True,
        }
    }

    response = requests.post(API_URL, headers=HEADERS, json=payload, timeout=60)
    data = response.json()

    # Case 1: model still loading
    if isinstance(data, dict) and data.get("error"):
        return None

    # Case 2: normal generation
    if isinstance(data, list) and len(data) > 0:
        return data[0].get("generated_text", "").strip()

    return None


@app.post("/chat")
def chat(req: ChatRequest):
    prompt = (
        "You are a compassionate mental health assistant.\n"
        "Respond thoughtfully and differently to each message.\n"
        "Give a helpful, empathetic reply in 2–4 sentences.\n\n"
        f"User: {req.message}\n"
        "Assistant:"
    )

    # 🔁 retry once if model is warming up
    text = call_model(prompt)
    if not text:
        time.sleep(2)
        text = call_model(prompt)

    if not text:
        return {
            "reply": "I’m here with you. Please try again in a moment — I’m ready to listen."
        }

    # clean response
    reply = text.split("Assistant:")[-1].strip()

    if len(reply) < 5:
        reply = "I’m here with you. Could you share a bit more about what you’re feeling?"

    return {"reply": reply}
