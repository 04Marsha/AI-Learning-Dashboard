def detect_problem_type(y):
    if y.dtype.kind in ['i', 'f']:
        if y.nunique() > 10:
            return "regression"
        else:
            return "classification"
    else:
        return "classification"