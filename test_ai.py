import os
from dotenv import load_dotenv
from google import genai

# Load API key from .env file
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

# Create client
client = genai.Client(api_key=api_key)

# Test the model
response = client.models.generate_content(
    model="gemini-3.6-flash",
    contents="Say hello in one short sentence."
)

print("✅ Gemini API Working!")
print("Response:", response.text)