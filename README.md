# AI Learning Dashboard (WIP 🚧)

A modular AI system built using Angular Microfrontends (Module Federation) and a FastAPI + ML backend.

This project is currently under active development.

---

## 🎯 Goal

Build a scalable AI system that demonstrates:

- Microfrontend architecture (Angular)
- Independent module development
- FastAPI backend services
- Machine Learning training & prediction pipeline
- Clean system workflow enforcement

---

## 🧠 Architecture Overview

This project follows a monorepo structure with independently developed microfrontends.

### 📦 Project Structure

```text
ai-learning-dashboard/
│
├── shell/
│   ├── Host container (Angular 20)
│   └── Loads remote microfrontends via Module Federation
│
├── data-mfe/
│   ├── Handles dataset upload
│   └── Communicates with backend for validation
│
├── training-mfe/
│   ├── Handles model training workflows
│   └── Displays training metrics
│
├── prediction-mfe/ (WIP)
│   └── Handles model predictions
│
├── visualization-mfe/ (WIP)
│   └── Displays model evaluation metrics & visual insights
│
└── backend/
    ├── FastAPI + ML services
    ├── main.py
    ├── requirements.txt
    └── services/
        ├── dataset_service.py
        └── training_service.py
```

---

## 🔄 System Flow

Upload → Validate → Detect → Train → Predict → Visualize

---

## ✅ Current Status

✔ Shell application configured with Module Federation  
✔ data-mfe connected to backend  
✔ Dataset upload endpoint implemented  
✔ Intelligent problem-type detection (Regression vs Classification)  
✔ Training service structured  

🚧 Prediction pipeline in progress  
🚧 Visualization module in progress  
🚧 Persistent dataset storage  
🚧 Model serialization  

---

## ⚙ Backend Stack

- FastAPI
- Python
- Scikit-learn
- Modular service structure

---

## 🧩 Frontend Stack

- Angular 20
- Module Federation
- Independent microfrontends
- Workflow-based navigation

---
