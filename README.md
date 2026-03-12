# 🧠 AI Learning Dashboard

A modular AI workflow platform built using Angular Microfrontends (Module Federation) and a FastAPI + Machine Learning backend.

The system demonstrates how modern microfrontend architecture can integrate with machine learning pipelines to create scalable and modular AI applications.

> ⚠️ This project is a learning-focused prototype designed to demonstrate architecture and ML workflow integration rather than production-grade ML.

---

# 🚀 Key Features

### 📊 Dataset Management

* Upload CSV datasets
* Automatic dataset validation
* Dataset preview
* Numeric summary statistics
* Column metadata extraction

### 🧠 Intelligent Problem Detection

The system automatically detects the machine learning problem type:

* **Regression**
* **Classification**

This is determined by analyzing the target column (last column of dataset).

---

### 🤖 Model Training Pipeline

Supported algorithms are automatically restricted based on detected problem type.

| Problem Type   | Algorithms                         |
| -------------- | ---------------------------------- |
| Regression     | Linear Regression                  |
| Classification | Logistic Regression, Decision Tree |

Training pipeline includes:

* Train/test split
* Model fitting
* Performance evaluation
* Metric reporting

Metrics used:

* **R² Score** for regression
* **Accuracy** for classification

---

### 🔮 Prediction API

After training a model, the system allows predictions using:

```
POST /predict
```

Users provide feature values and the trained model generates predictions.

---

# 🏗 System Architecture

The project uses a Microfrontend architecture.

Each major functionality is built as an independent Angular application.

```
                   ┌────────────────────┐
                   │   Angular Shell    │
                   │   (Host App)       │
                   └─────────┬──────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
   Data MFE            Training MFE         Prediction MFE
 Dataset Upload         Model Training         Predictions
 Validation             Metrics Display        (WIP)

                              │
                              ▼
                      FastAPI Backend
                              │
                    ┌─────────┴─────────┐
                    │                   │
            Dataset Service       Training Service
                    │                   │
                    ▼                   ▼
              Data Processing     ML Model Training
```

---

# 📦 Project Structure

```
ai-learning-dashboard/
│
├── shell/
│   ├── Angular host application
│   └── Loads microfrontends via Module Federation
│
├── data-mfe/
│   ├── Dataset upload UI
│   ├── Dataset preview
│   └── Backend communication
│
├── training-mfe/
│   ├── Model training UI
│   └── Training metrics display
│
├── prediction-mfe/
│   └── Prediction interface
│
├── visualization-mfe/
│   └── Model metrics visualization
│
└── backend/
    │
    ├── main.py
    ├── requirements.txt
    │
    └── services/
        │
        ├── dataset_service.py
        ├── training_service.py
        └── utils.py
```

---

# ⚙ Backend Implementation

The backend is built using FastAPI and follows a modular service architecture.

### Dataset Service

Responsible for:

* Reading CSV datasets
* Storing dataset in memory
* Returning dataset metadata
* Generating dataset preview
* Computing numeric summaries

---

### Training Service

Responsible for:

* Fetching dataset
* Detecting problem type
* Selecting allowed algorithms
* Training ML models
* Evaluating performance
* Saving trained model in memory

Training pipeline:

```
Dataset
   ↓
Feature Extraction
   ↓
Train/Test Split
   ↓
Model Training
   ↓
Evaluation
```

---

### Model Metrics

Metrics returned after training:

Example:

```json
{
 "problem_type": "classification",
 "algorithm": "decision_tree",
 "score": 0.92
}
```

---

# 🧩 Frontend Implementation

The frontend is built using Angular 20 with Webpack Module Federation.

### Shell Application

Acts as the host container responsible for:

* Loading remote microfrontends
* Navigation between modules
* Shared dependencies

---

### Microfrontends

Each module runs as an independent Angular application.

| Microfrontend     | Responsibility              |
| ----------------- | --------------------------- |
| data-mfe          | Dataset upload & validation |
| training-mfe      | Training models             |
| prediction-mfe    | Generate predictions        |
| visualization-mfe | Display metrics             |

Benefits:

* Independent development
* Modular architecture
* Easier scaling
* Team collaboration

---

# 🔄 System Workflow

```
Upload Dataset
        ↓
Dataset Validation
        ↓
Problem Type Detection
        ↓
Algorithm Selection
        ↓
Model Training
        ↓
Evaluation Metrics
        ↓
Prediction
        ↓
Visualization
```

---

# 🛠 Technology Stack

### Frontend

* Angular 20
* Webpack Module Federation
* Microfrontend Architecture
* CSS

---

### Backend

* FastAPI
* Python
* Pandas
* Scikit-learn

---

# 📈 Example ML Pipeline

Example classification training flow:

```
Dataset → Train/Test Split → Logistic Regression → Accuracy Evaluation
```

Example regression training flow:

```
Dataset → Train/Test Split → Linear Regression → R² Score
```

---

# ⚠ Current Limitations

This project is a prototype for learning architecture concepts, so some features are intentionally simplified.

Current limitations:

* Dataset stored only in memory
* Model not persisted to disk
* Only basic algorithms implemented

---

# 🚧 Future Improvements

Planned enhancements include:

* Model serialization using joblib
* Dataset persistence
* Advanced ML algorithms
* Hyperparameter tuning
* Real-time model metrics visualization
* Docker deployment
* Authentication & user sessions

---

# 💡 Learning Objectives

This project was built to explore:

* Microfrontend architecture
* Angular Module Federation
* FastAPI service architecture
* ML pipeline integration
* Modular system design

---

# 👨‍💻 Author

Developed as part of a *full-stack Microfrontend + AI architecture learning project.
