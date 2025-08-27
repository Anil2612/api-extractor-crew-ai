from firebase import db


class FirestoreService:
    def __init__(self, collection_name: str):
        self.collection = db.collection(collection_name)

    def create(self, doc_id: str, data):
        """Create or overwrite a document"""
        self.collection.document(doc_id).set(data)
        return {"status": "created", "id": doc_id, "data": data}

    def read(self, doc_id: str):
        """Read a document"""
        doc = self.collection.document(doc_id).get()
        if doc.exists:
            return doc.to_dict()
        return None

    def update(self, doc_id: str, data: dict):
        """Update a document"""
        self.collection.document(doc_id).update(data)
        return {"status": "updated", "id": doc_id, "data": data}

    def delete(self, doc_id: str):
        """Delete a document"""
        self.collection.document(doc_id).delete()
        return {"status": "deleted", "id": doc_id}

    def list_all(self):
        """List all documents in collection with id inside object"""
        docs = self.collection.stream()
        return [
            {"id": doc.id, **doc.to_dict()}  # merge id with document data
            for doc in docs
        ]
