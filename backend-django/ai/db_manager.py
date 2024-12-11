import faiss
import numpy as np
import os
import pickle

class FAISSManager:
    def __init__(self, dimension, db_path="vector_index.faiss"):
        self.dimension = dimension
        self.db_path = db_path
        self.index = faiss.IndexFlatL2(dimension)  # L2 distance for similarity

        # Load existing index if it exists
        if os.path.exists(self.db_path):
            print(f"Loading FAISS index from disk..{self.db_path}.")
            with open(self.db_path + "_meta.pkl", "rb") as f:
                self.metadata = pickle.load(f)
            self.index = faiss.read_index(self.db_path)  # Fix: Removed extra argument
        else:
            self.metadata = {}  # Store metadata as a dictionary

    def add(self, vector, id, metadata=None):
        self.validate_synchronization
        if id in self.metadata:
            print(f"ID {id} already exists. Updating by removing earlier.")
            self.remove(id=id)
            
        vector = np.array([vector]).astype("float32")
        self.index.add(vector)  # Add to FAISS index
        print(f"added vector {id} total = {self.size()}")
        self.metadata[id] = metadata  # Save metadata separately
        self.save()  # Save the updated index to disk
    
    def size(self):
        return self.index.ntotal
    
    def query(self, vector, top_k=None):

        
        # if isinstance(vector, str):  # If it's a string (vector_id)
        #     # Retrieve the actual vector from FAISS metadata or other storage
        #     vector = self.get_vector_by_id(vector)
        vector = np.array([vector]).astype("float32")
        top_k = top_k if top_k else self.index.ntotal
        distances, indices = self.index.search(vector, top_k) 
        results = []
        for idx, distance in zip(indices[0], distances[0]):
            if idx != -1:  # Check if the index is valid
                id = list(self.metadata.keys())[idx] # if idx < len(self.metadata) else None
                results.append({"id": id, "metadata": self.metadata[id], "distance": distance})
        
        print("query result = ",results)
        return results
    
  

    def save(self):
        faiss.write_index(self.index, self.db_path)
        with open(self.db_path + "_meta.pkl", "wb") as f:
            pickle.dump(self.metadata, f)
    
    def remove(self, id):
        """
        Remove a vector and its metadata from the index.
        """
        if id not in self.metadata:
            raise ValueError(f"ID {id} not found in metadata.")
        
        # Find the FAISS index position for this ID
         # Find the position of the vector to remove
        keys = list(self.metadata.keys())
        pos = keys.index(id)  # Find the position of the ID in metadata
        
        # Remove from FAISS
        self.index.remove_ids(np.array([pos]))
        
        # Update metadata and ID mapping
        del self.metadata[id]
        # self.index_to_id.pop(pos)
        self.save()
    
    def validate_synchronization(self):
        assert len(self.index_to_id) == self.index.ntotal, \
            f"Mismatch: FAISS index has {self.index.ntotal} vectors, but index_to_id has {len(self.index_to_id)}."
        
    # def get_vector_by_id(self, vector_id):
    #     """
    #     Retrieve the vector associated with the vector_id from the metadata or storage.
    #     """
    #     # Assuming the vector is stored in a way you can retrieve it from metadata
    #     if vector_id in self.metadata:
    #         # You should store vectors in a way you can fetch it here
    #         return self.metadata[vector_id]['embedding']
    #     return None
