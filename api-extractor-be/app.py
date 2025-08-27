from fastapi import FastAPI, HTTPException
import requests
from pydantic import BaseModel
from crew import api_extractor_crew
from fastapi.middleware.cors import CORSMiddleware
from services.firestore_service import FirestoreService
from services.json_service import clean_json
import random
import os

origins = ["http://localhost:5173"]


app = FastAPI(title="API Extractor Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class userRequest(BaseModel):
    username: str
    password: str

class deleteRequest(BaseModel):
    doc_id: str

class propmtRequest(BaseModel):
    prompt: str
    doc_id: str

class uploadRequest(BaseModel):
    name: str
    sheetName: str
    rows: list

excel_data_service = FirestoreService("excelData")


@app.get("/")
def home():
    return {"message": "API Extractor Backend is running!"}
    
@app.post("/login")
def login(request: userRequest):
    url = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={os.getenv("FIREBASE_API_KEY")}"
    payload = {
        "email": request.username,
        "password": request.password,
        "returnSecureToken": True
    }

    response = requests.post(url, json=payload)
    if response.status_code == 200:
        data = response.json()
        return {
            "idToken": data["idToken"],
            "refreshToken": data["refreshToken"],
            "expiresIn": data["expiresIn"]
        }
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")


@app.get("/list")
def list():
    data = excel_data_service.list_all()
    return {"data": data}

@app.post("/delete")
def delete(request: deleteRequest):
    excel_data_service.delete(request.doc_id)
    return {"message": "Excel Deleted Successfully"}

@app.post("/upload")
def upload(request: uploadRequest):
    print('request', request)
    id = str(random.random())[2:]
    print('id', id) 
    excel_data_service.create(id, {**request.dict(), "id": id})
    return {"message": "Excel Uploaded Successfully"}

@app.post("/getDetails")
def run_task(request: propmtRequest):
    data = excel_data_service.read(request.doc_id)
    if not data:
        return {"error": "Document not found"}
    result = api_extractor_crew.kickoff({"prompt": request.prompt, "data": data["rows"]})
    try:
        cleaned = clean_json(result.raw)
    except Exception:
        cleaned = result.raw 
    return {"request": request.prompt, "response": cleaned}