import pandas as pd
from services.utils import detect_problem_type

current_dataset = None

def save_dataset(file):
    global current_dataset

    df = pd.read_csv(file)

    current_dataset = df

    return {
        "rows": df.shape[0],
        "columns": df.shape[1],
        "column_names": list(df.columns),
        "preview": df.head(5).to_dict(orient="records")
    }

def get_allowed_algorithm(problem_type: str):
    if problem_type == "regression":
        return ["linear_regression"]
    elif problem_type == "classification":
        return ["logistic_regression", "decision_tree"]
    return []

def get_dataset():
    return current_dataset

def get_dataset_info():
    global current_dataset

    if current_dataset is None:
        return {"exists": False}
    
    y = current_dataset.iloc[:, -1]
    problem_type = detect_problem_type(y)
    allowed_algorithms = get_allowed_algorithm(problem_type)

    return {
        "exists": True,
        "rows": current_dataset.shape[0],
        "columns": current_dataset.shape[1],
        "column_names": list(current_dataset.columns),
        "problem_type": problem_type,
        "allowed_algorithms": allowed_algorithms
    }

def get_dataset_preview():
    global current_dataset

    if current_dataset is None:
        return {"exists": False}
    
    preview = current_dataset.head(5).to_dict(orient="records")

    numeric_df = current_dataset.select_dtypes(include=["number"])
    numeric_summary = {}

    for column in numeric_df.columns:
        numeric_summary[column] = {
            "mean": round(float(numeric_df[column].mean()), 4),
            "min": round(float(numeric_df[column].min()), 4),
            "max": round(float(numeric_df[column].max()), 4),
            "std": round(float(numeric_df[column].std()), 4),
        }

    return {
        "exists": True,
        "preview": preview,
        "numeric_summary": numeric_summary
    }