from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score
from sklearn.metrics import r2_score
from services.dataset_service import get_dataset

trained_model = None
last_metrics = None

def detect_problem_type(y):
    if y.dtype.kind in ['i', 'f']:
        if y.nunique() > 10:
            return "regression"
        else:
            return "classification"
    else:
        return "classification"

def train_model(algorithm: str):
    global trained_model, last_metrics

    dataset = get_dataset()

    if dataset is None:
        return {"error": "No dataset uploaded"}
    
    X = dataset.iloc[:, :-1]
    y = dataset.iloc[:, -1]
    problem_type = detect_problem_type(y)

    X = X.select_dtypes(include=['number'])

    if X.empty:
        return {"error": "No numeric feature columns available"}

    if problem_type == "regression":
        if algorithm != "linear_regression":
            return {"error": "This dataset requires regression algorithms"}
        model = LinearRegression()
    elif problem_type == "classification":
        if algorithm == "logistic_regression":
            model = LogisticRegression(max_iter=1000)
        elif algorithm == "decision_tree":
            model = DecisionTreeClassifier()
        else:
            return {"error": "This dataset requires classification algorithms"}
    

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    model.fit(X_train, y_train)

    predictions = model.predict(X_test)

    if problem_type == "regression":
        score = r2_score(y_test, predictions)
    else:
        score = accuracy_score(y_test, predictions)
    
    trained_model = model

    last_metrics = {
        "problem_type": problem_type,
        "algorithm": algorithm,
        "score" : round(float(score), 4)
    }
    return last_metrics


def get_metrics():
    global last_metrics
    return last_metrics