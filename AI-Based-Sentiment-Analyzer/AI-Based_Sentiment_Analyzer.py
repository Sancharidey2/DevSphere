#############################################
# Sentiment Analysis Project
# Author: Siddharth Sharma
# Date: January 14, 2025
# Description: This project leverages a pre-trained
# transformer model from the Hugging Face library to
# perform sentiment analysis on text data. It uses the
# "nlptown/bert-base-multilingual-uncased-sentiment"
# model to classify text as positive, negative, or neutral.
#############################################

# Import required libraries
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from transformers import pipeline
from sklearn.metrics import classification_report

# Step 1: Load Pre-trained Model and Tokenizer
# Description: This step loads a pre-trained sentiment analysis model
# and its associated tokenizer from the Hugging Face library.
MODEL_NAME = "nlptown/bert-base-multilingual-uncased-sentiment"  # Model name

# Load tokenizer and model
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)

# Step 2: Create a Sentiment Analysis Pipeline
# Description: Initialize a sentiment analysis pipeline
# using the loaded model and tokenizer.
sentiment_pipeline = pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)

# Step 3: Analyze Sentiments
def analyze_sentiments(texts):
    """
    Analyze sentiments of a list of texts.

    :param texts: List of text strings
    :return: List of sentiment results
    """
    return sentiment_pipeline(texts)

# Step 4: Test the System with Sample Data
# Description: Test the sentiment analysis system with sample inputs.
sample_texts = [
    "I absolutely love this product! It's fantastic.",
    "The movie was terrible and I hated it.",
    "I'm not sure how I feel about this experience.",
    "The service was okay, but the food was excellent.",
    "Terrible customer support ruined my day!"
]

# Analyze sentiments for sample data
results = analyze_sentiments(sample_texts)

# Display Results
print("\nSample Sentiment Analysis Results:")
for text, result in zip(sample_texts, results):
    print(f"Text: {text}")
    print(f"Sentiment: {result['label']}, Confidence: {result['score']:.2f}")
    print("-" * 40)

# Step 5: Advanced Testing and Evaluation
# Description: Evaluate the sentiment analysis model using test data.
def evaluate_model(test_texts, test_labels):
    """
    Evaluate the sentiment model using test data.

    :param test_texts: List of text strings (test dataset)
    :param test_labels: List of true labels
    """
    predictions = analyze_sentiments(test_texts)
    predicted_labels = [pred["label"] for pred in predictions]

    print("\nClassification Report:")
    print(classification_report(test_labels, predicted_labels, digits=4))

# Example test data for evaluation
test_texts = [
    "This is the best day of my life!",
    "I am very disappointed with the service.",
    "It was an average experience, nothing special.",
    "Fantastic product! Highly recommend it.",
    "The experience was absolutely horrible!"
]

# True labels for the test data (adjust to match the model's label set)
test_labels = ["positive", "negative", "neutral", "positive", "negative"]

# Evaluate the model
evaluate_model(test_texts, test_labels)
