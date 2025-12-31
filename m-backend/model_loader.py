import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
from peft import PeftModel

torch.set_num_threads(4)  # change to number of CPU cores
torch.set_grad_enabled(False)
do_sample=False

BASE_MODEL = "Qwen/Qwen2.5-1.5B"
LORA_REPO = "DPrajwalxI/madhubani-mindmate-lora"

tokenizer = AutoTokenizer.from_pretrained(
    BASE_MODEL,
    trust_remote_code=True
)

model = AutoModelForCausalLM.from_pretrained(
    BASE_MODEL,
    device_map="cpu",
    torch_dtype=torch.float32,
    trust_remote_code=True
)

# 🔥 INT8 CPU quantization
model = torch.quantization.quantize_dynamic(
    model,
    {torch.nn.Linear},
    dtype=torch.qint8
)

model = PeftModel.from_pretrained(model, LORA_REPO)
model.eval()
