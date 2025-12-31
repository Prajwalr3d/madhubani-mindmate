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

---------------------------------------------------------------------------SCREENSHORTS--------------------------------------------------------------------------------
##  Project Screenshots

##  Screenshots

###  All Screenshots (Drive)
https://drive.google.com/drive/folders/1vx38qRDrQfYZEtjU05o21RyRKYwWdPEH?usp=drive_link

---

## Flow Chart

![Flow Chart](https://github.com/user-attachments/assets/729704fb-9606-4b2f-87ef-b2772d5e1222)

---

##  Data Flow Diagram (DFD)

![DFD](https://github.com/user-attachments/assets/e3c4db17-e83b-4590-8505-aecca081cb5f)

---

##  Chatbot Interface

![Chat UI 1](https://github.com/user-attachments/assets/f36df54f-fa0b-4544-8d69-92a898387861)

![Chat UI 2](https://github.com/user-attachments/assets/1e429df2-7caa-4242-ac22-91ef604d509b)

![Chat UI 3](https://github.com/user-attachments/assets/0798ff37-16fc-42ce-aa8f-d4ea000e15cc)

![Chat UI 4](https://github.com/user-attachments/assets/e9144fd9-abcb-488a-b66b-1a1049b377dd)

![Chat UI 5](https://github.com/user-attachments/assets/3473a27a-3378-4b36-b32c-a654aa0eb6ec)

---

##  Fine-Tuned Response Example

![Fine Tuned Response](https://github.com/user-attachments/assets/10cacbd9-a9d3-4cfe-b303-f423f4a2ee14)











-------------------------------------------------#Future Enhancements [ROUND 2]---------------------------------------------------------------------------------------------------------------------------
User mood tracking and journaling

Personalized responses 

Structured coping exercises (CBT-inspired prompts)

User feedback-based LoRA retraining

Improved privacy controls


