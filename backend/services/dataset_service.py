import pandas as pd

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

def get_dataset():
    return current_dataset

def get_dataset_info():
    global current_dataset

    if current_dataset is None:
        return {"exists": False}
    
    return {
        "exists": True,
        "rows": current_dataset.shape[0],
        "columns": current_dataset.shape[1],
        "columns_names": list(current_dataset.columns)
    }