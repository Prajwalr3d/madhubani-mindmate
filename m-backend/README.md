# Madhubani-mindmate

Madhubani MindMate is a mental health chatbot designed to provide calm, empathetic, and supportive responses.  
It combines a rule-based frontend with a fine-tuned language model deployed via Hugging Face.

---

#Features

- Empathetic mental health conversations
- Cloud-based inference (no local GPU required)
- FastAPI backend
- Frontend chat interface
- Secure environment variable handling
- Hugging Face–hosted fine-tuned model (LoRA)

---

#Architecture

Frontend  
→ Backend (FastAPI)  
→ Hugging Face Inference API  
→ Fine-tuned Qwen model with LoRA

---

#Tech Stack

- Python
- FastAPI
- Gradio
- Hugging Face Inference API
- Qwen2.5-1.5B + LoRA
- Git & GitHub

---

# Setup Instructions

#clone repository
```bash
git clone <your-repo-url>
cd madhubani-mindmat

#Create virtual environment
python -m venv venv
venv\Scripts\activate

#Install dependencies
pip install -r requirements.txt


#Configure environment variables
HF_TOKEN=your_huggingface_token_here

#Run the application
uvicorn app:app --reload
python app.py


