import psutil
import os
from sentence_transformers import SentenceTransformer

process = psutil.Process(os.getpid())

print(f"Memory before model: {process.memory_info().rss / (1024*1024):.2f} MB")

# Load your model
model = SentenceTransformer("all-MiniLM-L6-v2")

print(f"Memory after model: {process.memory_info().rss / (1024*1024):.2f} MB")
