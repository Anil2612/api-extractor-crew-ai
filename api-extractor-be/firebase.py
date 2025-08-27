import firebase_admin
from firebase_admin import credentials, firestore
import json
import os

# Initialize Firebase
cred_dict = json.loads(os.getenv("FIREBASE_SERVICE_ACCOUNT_JSON"))
cred = credentials.Certificate(cred_dict)

print("cred", cred)

if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)

db = firestore.client()

