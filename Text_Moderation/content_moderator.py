from transformers import AutoModelForSequenceClassification, AutoTokenizer, pipeline
import torch

# Load the model and tokenizer
model_name = "KoalaAI/Text-Moderation"
model = AutoModelForSequenceClassification.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)
# Load the toxic-BERT model
moderation_model = pipeline("text-classification", model="unitary/toxic-bert", return_all_scores=True)

def moderate_text(text, thresholdOK=0.4):
    """
    Function to check if the input text is safe or unsafe based on category thresholds.

    Args:
        text (str): The input text to moderate.
        thresholds (dict): A dictionary with category labels as keys and threshold values as values.
                          Default values are used if not provided.

    Returns:
        dict: A dictionary containing the moderation result and category violations.
    """

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

    map={}
    for label, prob in label_prob_pairs:
        map[label] = prob
    
    if map['OK'] < thresholdOK:
        return False

    return True

# Function to mask toxic words in a sentence
def mask_toxic_words(sentence, thresholdMask=0.7):
    words = sentence.split()  # Split sentence into words
    masked_sentence = []

    # Analyze each word for toxicity
    for word in words:
        result = moderation_model(word)
        toxic_score = next((score["score"] for score in result[0] if score["label"] == "toxic"), 0)

        # Mask word if it exceeds the threshold
        if toxic_score >= thresholdMask:
            masked_sentence.append("*" * len(word))  # Use asterisks equal to the length of the word
        else:
            masked_sentence.append(word)

    return " ".join(masked_sentence)

def content_moderator(text, moderate_thresholdOK=0.4, mask_threshold=0.7):
    """
    Pipeline to moderate text and censor toxic words.
    Args:
        text (str): The input text.
        moderate_thresholds (dict): Thresholds for `moderate_text` function.
        moderate_thresholdOK (float): OK label threshold for `moderate_text` function.
        mask_threshold (float): Toxicity threshold for `mask_toxic_words` function.
    Returns:
        dict: A dictionary with moderation status and censored text.
    """
    # Step 1: Moderate the text
    is_safe = moderate_text(text, thresholdOK=moderate_thresholdOK)
    
    if not is_safe:
        return {
            "status": "unsafe",
            "censored_text": ""
        }

    # Step 2: Censor toxic words regardless of moderation status
    censored_text = mask_toxic_words(text, thresholdMask=mask_threshold)

    # Return the results
    return {
        "status": "safe" if is_safe else "unsafe",
        "censored_text": censored_text
    }

example_text = "You are such an idiot and but also very intelligent!"
pipeline_result = content_moderator(example_text)
print(pipeline_result)

