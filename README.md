#Core IDEA

Mental health support systems lack intelligent, personalized early detection, as most existing chatbots rely on static, rule-based responses. There is a need for an AI and ML-driven mental health chatbot that can analyze user conversations using NLP to detect emotional distress and provide context-aware, ethical support.

The chatbot is designed to provide a safe and non-judgmental space where users can express emotional concerns such as stress, anxiety, loneliness, burnout, and overthinking.

Its primary purpose is emotional support, not diagnosis or treatment. The system does not replace therapists or medical professionals but acts as an initial support layer.

The chatbot uses a large language model fine-tuned with LoRA on curated mental-health-focused conversations to ensure empathetic, calm, and supportive responses.

Fine-tuning is limited to LoRA layers, keeping the base model unchanged. This makes the system efficient, stable, and achievable with limited computational resources.

A rule-based crisis detection mechanism is placed before the language model to identify high-risk messages and respond with safe guidance and emergency resources.





# Madhubani-mindmate (Personalized Chat Bot)

Madhubani MindMate is a mental health chatbot designed to provide calm, empathetic, and supportive responses.  
It combines a rule-based frontend with a fine-tuned language model deployed via Hugging Face.
------





---
#Team Mate Contribution
Team Leader and Frontend :Gaurav Kandpal
Backend Developer and ML: Prajwal Surya
Researcher:Shivani Rana
Frontend and Data Cleaning:Lakshit Pandey






#Features

- Empathetic mental health conversations
- Cloud-based inference (no local GPU required)
- FastAPI backend
- Frontend chat interface
- Secure environment variable handling
- Hugging Face–hosted fine-tuned model (LoRA)
- Trained on responses 

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
- JAVA (Rule Based Responses json files )
- 

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
#Contribution FIle
![Team Mate Contribution](https://github.com/user-attachments/assets/006d479b-f2bf-4c04-bb6b-e8d1755bbde3)



##  Screenshots

###  All Screenshots (Drive)                           ------------- PLEASE COPY AND PASTE IT in Browser  ---------------
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
Personalized Conversation Memory
The chatbot can remember past topics discussed by the user (such as exam stress or sleep issues) to provide more context-aware and consistent responses over time.

Mood Tracking and Emotional Trends
Users can be asked to log their mood daily or weekly, allowing the system to identify emotional patterns and gently suggest supportive actions.

Structured Coping Exercises
The chatbot can guide users through simple, evidence-based techniques such as breathing exercises, journaling prompts, and cognitive reframing activities.

Improved Crisis Handling
Crisis detection can be enhanced by severity levels, enabling different responses for mild distress, moderate stress, and emergency situations.

User Feedback Integration
Users can provide feedback on responses, which can later be used to improve the LoRA fine-tuned model and make replies more helpful.

Privacy and Data Control Features
Options like auto-deleting chat history or using the chatbot anonymously can strengthen user trust and data protection.

Explainable Responses
The chatbot can briefly explain why a particular coping suggestion was given, helping users understand and trust the guidance.

Integration with External Support Resources
In the future, the system can suggest helplines, counselors, or mental health resources based on user needs and location.

