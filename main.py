import pandas as pd
import os
from dotenv import load_dotenv
from google import genai

# Load API key
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

# Load the data
df = pd.read_csv("transactions.csv")

# 1. Total monthly spend
total_spend = df["amount"].sum()

# 2. Category-wise spend and count
category_summary = df.groupby("category").agg(
    total_amount=("amount", "sum"),
    count=("merchant", "count")
).reset_index()

# 3. Find duplicate categories
duplicates = category_summary[category_summary["count"] > 1]

duplicate_details = []
for _, row in duplicates.iterrows():
    merchants_in_category = df[df["category"] == row["category"]]["merchant"].tolist()
    duplicate_details.append(f"{row['category']}: {merchants_in_category} costing ₹{row['total_amount']} total")

# 4. Highest spending subscription
highest = df.loc[df["amount"].idxmax()]

# ---- Build a prompt for Gemini ----
prompt = f"""
You are a friendly financial assistant analyzing someone's recurring subscriptions.

Here is their data:
- Total monthly spend: ₹{total_spend}
- Highest single expense: {highest['merchant']} (₹{highest['amount']})
- Categories with multiple/duplicate subscriptions:
{chr(10).join(duplicate_details)}

Write a short, friendly, 4-5 sentence summary explaining:
1. Their overall spending situation
2. Which duplicate subscriptions they could consider cancelling to save money
3. An estimated amount they could save monthly

Keep it conversational and actionable, not robotic.
"""

print("=" * 50)
print("SUBSCRIPTION GUARDIAN - AI ANALYSIS")
print("=" * 50)

response = client.models.generate_content(
    model="gemini-3.6-flash",
    contents=prompt
)

print("\n🤖 AI Recommendation:\n")
print(response.text)
print("\n" + "=" * 50)