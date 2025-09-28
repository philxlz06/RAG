from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import faiss
import shutil
from app.utils.parser import extract_text, chunk_text, embed_chunks
from openai import OpenAI

load_dotenv()

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
client = OpenAI(api_key=OPENAI_API_KEY)

app = FastAPI()

# Enable CORS so frontend can call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# FAISS index (in-memory)
embedding_dim = 384
index = faiss.IndexFlatL2(embedding_dim)
text_chunks_store = []

# Pydantic model for JSON query


class QueryRequest(BaseModel):
    query: str


@app.get("/")
def health_check():
    return {"status": "ok"}


@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        text = extract_text(file_path)
        chunks = chunk_text(text)
        embeddings = embed_chunks(chunks)

        print(f"Chunks (first 2): {chunks[:2]}")
        print(f"Embeddings shape: {embeddings.shape}")

        index.add(embeddings)
        text_chunks_store.extend(chunks)

    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=400)

    return JSONResponse({
        "filename": file.filename,
        "status": "saved",
        "preview": text[:200]
    })


@app.post("/query")
async def query_endpoint(request: QueryRequest):
    text = request.query

    if len(text_chunks_store) == 0:
        return JSONResponse({"error": "no documents uploaded yet."}, status_code=400)

    query_embedding = embed_chunks([text])
    D, I = index.search(query_embedding, k=3)
    relevant_chunks = [text_chunks_store[i] for i in I[0] if i != -1]

    prompt = f"Answer the question using the following context:\n\n"
    prompt += "\n--\n".join(relevant_chunks)
    prompt += f"\n\nQuestion: {text}\nAnswer:"

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        temperature=0
    )

    answer = response.choices[0].message.content

    return JSONResponse({
        "query": text,
        "response": answer,
        "sources": relevant_chunks
    })
