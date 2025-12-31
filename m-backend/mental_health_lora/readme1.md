from huggingface_hub import HfApi

api = HfApi()

# 1. Create repo (safe even if it already exists)
api.create_repo(
    repo_id="prajwal-surya/madhubani-mindmate-lora",
    repo_type="model",
    exist_ok=True
)

# 2. Upload LoRA folder
api.upload_folder(
    folder_path="mental_health_lora",   # CHANGE if your folder name is different
    repo_id="prajwal-surya/madhubani-mindmate-lora",
    repo_type="model"
)

print("✅ LoRA uploaded successfully")
