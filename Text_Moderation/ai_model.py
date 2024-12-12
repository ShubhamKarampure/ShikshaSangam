# from transformers import AutoModelForSequenceClassification, AutoTokenizer

# # Load the model and tokenizer
# model = AutoModelForSequenceClassification.from_pretrained("KoalaAI/Text-Moderation")
# tokenizer = AutoTokenizer.from_pretrained("KoalaAI/Text-Moderation")

# # Run the model on your input
# inputs = tokenizer("I will find you and I will kill you", return_tensors="pt")
# outputs = model(**inputs)

# # Get the predicted logits
# logits = outputs.logits

# # Apply softmax to get probabilities (scores)
# probabilities = logits.softmax(dim=-1).squeeze()
# print('probabilities = ',probabilities)

# # Retrieve the labels
# id2label = model.config.id2label
# labels = [id2label[idx] for idx in range(len(probabilities))]
# print("id2label = ",id2label)
# print("labels = ",labels)

# # Combine labels and probabilities, then sort
# label_prob_pairs = list(zip(labels, probabilities))
# label_prob_pairs.sort(key=lambda item: item[1], reverse=True)  

# # Print the sorted results
# for label, probability in label_prob_pairs:
#     print(f"Label: {label} - Probability: {probability:.4f}")

from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch

def moderate_text(text, thresholds=None):
    """
    Function to check if the input text is safe or unsafe based on category thresholds.

    Args:
        text (str): The input text to moderate.
        thresholds (dict): A dictionary with category labels as keys and threshold values as values.
                          Default values are used if not provided.

    Returns:
        dict: A dictionary containing the moderation result and category violations.
    """
    # Default thresholds if none are provided
    if thresholds is None:
        thresholds = {
            # "S": 0.3,
            # "H": 0.3,
            # "V": 0.3,
            # "HR": 0.3,
            # "SH": 0.3,
            # "S3": 0.3,
            # "H2": 0.3,
            # "V2": 0.3
            "OK" : 0.4
        }

    # Load the model and tokenizer
    model_name = "KoalaAI/Text-Moderation"
    model = AutoModelForSequenceClassification.from_pretrained(model_name)
    tokenizer = AutoTokenizer.from_pretrained(model_name)

    # Tokenize the input text
    inputs = tokenizer(text, return_tensors="pt")

    # Run the model and get logits
    with torch.no_grad():
        outputs = model(**inputs)
    logits = outputs.logits

    # Convert logits to probabilities
    probabilities = logits.softmax(dim=-1).squeeze()

    # Map IDs to labels
    id2label = model.config.id2label
    labels = [id2label[idx] for idx in range(len(probabilities))]

    # Combine labels and probabilities
    label_prob_pairs = list(zip(labels, probabilities.tolist()))

        # Print the sorted results
    for label, probability in label_prob_pairs:
        print(f"Label: {label} - Probability: {probability:.4f}")

    # Determine if the content is safe or unsafe
    violations = []
    for label, prob in label_prob_pairs:
        if label == "OK" and prob < thresholds[label]:
            return False

    # result = {
    #     "status": "unsafe" if violations else "safe",
    #     "violations": violations
    # }
    # for label, prob in label_prob_pairs:
    #     if label in thresholds and prob < thresholds[label]:
    #         violations.append({"category": label, "probability": prob})
    return True

# Example usage
text_input = "I don't like you"
moderation_result = moderate_text(text_input)
print(moderation_result)