# from transformers import AutoModelForSequenceClassification, AutoTokenizer, pipeline
# import torch

# # Load the model and tokenizer
# model_name = "KoalaAI/Text-Moderation"
# model = AutoModelForSequenceClassification.from_pretrained(model_name)
# tokenizer = AutoTokenizer.from_pretrained(model_name)

# def moderate_text(text, thresholdOK=0.4):
#     """
#     Function to check if the input text is safe or unsafe based on category thresholds.

#     Args:
#         text (str): The input text to moderate.
#         thresholds (dict): A dictionary with category labels as keys and threshold values as values.
#                           Default values are used if not provided.

#     Returns:
#         dict: A dictionary containing the moderation result and category violations.
#     """
#     # Tokenize the input text
#     inputs = tokenizer(text, return_tensors="pt")

#     # Run the model and get logits
#     with torch.no_grad():
#         outputs = model(**inputs)
#     logits = outputs.logits

#     # Convert logits to probabilities
#     probabilities = logits.softmax(dim=-1).squeeze()

#     # Map IDs to labels
#     id2label = model.config.id2label
#     labels = [id2label[idx] for idx in range(len(probabilities))]

#     # Combine labels and probabilities
#     label_prob_pairs = list(zip(labels, probabilities.tolist()))

#     print('text = ',text)
#     # Print the sorted results
#     for label, probability in label_prob_pairs:
#         print(f"Label: {label} - Probability: {probability:.4f}")

#     map={}
#     for label, prob in label_prob_pairs:
#         map[label] = prob
    
#     if map['OK'] < thresholdOK:
#         return False

#     return True

# example_text = "You are such an idiot and a fool!"
# print
# print(moderate_text(example_text))



# text_moderation.py
from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch

class TextModeration:
    def __init__(self, model_name="KoalaAI/Text-Moderation", thresholdOK=0.2):
        """
        Initializes the TextModeration class by loading the model and tokenizer.

        Args:
            model_name (str): Name of the model to load.
            thresholdOK (float): Default threshold for the 'OK' label.
        """
        self.model = AutoModelForSequenceClassification.from_pretrained(model_name)
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.thresholdOK = thresholdOK

    def moderate_text(self, text):
        """
        Checks if the input text is safe or unsafe based on the 'OK' label threshold.

        Args:
            text (str): The input text to moderate.

        Returns:
            bool: True if the text is safe, False otherwise.
        """
        # Tokenize the input text
        inputs = self.tokenizer(text, return_tensors="pt")

        # Run the model and get logits
        with torch.no_grad():
            outputs = self.model(**inputs)
        logits = outputs.logits

        # Convert logits to probabilities
        probabilities = logits.softmax(dim=-1).squeeze()

        # Map IDs to labels
        id2label = self.model.config.id2label
        labels = [id2label[idx] for idx in range(len(probabilities))]

        # Combine labels and probabilities
        label_prob_pairs = list(zip(labels, probabilities.tolist()))

        # Print the sorted results
        print('text = ', text)
        for label, probability in label_prob_pairs:
            print(f"Label: {label} - Probability: {probability:.4f}")

        # Check 'OK' label threshold
        prob_map = {label: prob for label, prob in label_prob_pairs}
        return prob_map['OK'] >= self.thresholdOK
