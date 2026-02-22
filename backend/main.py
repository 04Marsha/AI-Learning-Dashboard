from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services.dataset_service import save_dataset, get_dataset_info
from services.training_service import train_model

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "Backend is running"}

@app.post("/upload-dataset")
async def upload_dataset(file: UploadFile = File(...)):
    result = save_dataset(file.file)
    return result

@app.get("/dataset-info")
def dataset_info():
    return get_dataset_info()

class TrainRequest(BaseModel):
    algorithm: str

@app.post("/train")
def train(request: TrainRequest):
    return train_model(request.algorithm)