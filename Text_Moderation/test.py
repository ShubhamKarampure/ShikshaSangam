# main.py
from Text_Moderator import TextModeration

# Initialize the TextModeration instance
moderator = TextModeration(thresholdOK=0.2)

# Check if texts are safe
texts = [
    "You are such an idiot and a fool!",
    "This is a perfectly fine sentence."
]

for text in texts:
    is_safe = moderator.moderate_text(text)
    print(f"Is the text safe? {is_safe}")
