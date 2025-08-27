import json

def safe_json_load(value):
    """Try to parse a string as JSON, else return raw value."""
    if isinstance(value, str):
        try:
            return json.loads(value)
        except (json.JSONDecodeError, TypeError):
            return value
    return value

def clean_json(raw_json: str):
    """Convert raw JSON string with embedded JSON strings into proper JSON."""
    data = json.loads(raw_json)
    for key, val in data.items():
        data[key] = safe_json_load(val)
    return data