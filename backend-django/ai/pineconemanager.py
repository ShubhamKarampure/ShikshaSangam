import pinecone
from typing import List, Dict, Union


class PineconeManager:
    def __init__(self, api_key: str, environment: str, index_name: str, dimension: int):
        """
        Initialize PineconeManager with API key, environment, index name, and vector dimension.
        """
        pinecone.init(api_key=api_key, environment=environment)
        if index_name not in pinecone.list_indexes():
            pinecone.create_index(index_name, dimension=dimension, metric="cosine")
        self.index = pinecone.Index(index_name)

    def add_vector(self, vector: List[float], user_id: str):
        """
        Adds a vector to the Pinecone index with user_id as metadata.
        """
        self.index.upsert(vectors=[{
            "id": user_id,
            "values": vector,
            "metadata": {"user_id": user_id}
        }])

    def query_vector(self, vector: List[float], top_k: int = 5) -> List[Dict[str, Union[str, float]]]:
        """
        Queries the Pinecone index and returns the top-k similar vectors with metadata.
        """
        results = self.index.query(vector=vector, top_k=top_k, include_metadata=True)
        return [{"user_id": res["metadata"]["user_id"], "score": res["score"]} for res in results["matches"]]

    def get_vector_by_user_id(self, user_id: str) -> Dict:
        """
        Retrieves the vector and metadata associated with a given user_id.
        """
        result = self.index.fetch(ids=[user_id])
        if user_id in result["vectors"]:
            vector_data = result["vectors"][user_id]
            return {
                "user_id": vector_data["metadata"]["user_id"],
                "vector": vector_data["values"]
            }
        else:
            raise ValueError(f"User ID {user_id} not found in the index.")

    def delete_vector(self, user_id: str):
        """
        Deletes a vector from the Pinecone index by user_id.
        """
        self.index.delete(ids=[user_id])
