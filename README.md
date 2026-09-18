# 🛡️ Subscription Guardian

An AI-powered agent that analyzes recurring subscription transactions, detects duplicate or overlapping spending categories, and generates actionable, natural-language savings recommendations.

## What it does

- Analyzes a user's subscription transactions (CSV data)
- Identifies duplicate/overlapping categories (e.g., multiple OTT platforms, multiple food delivery apps)
- Uses Google's Gemini API to convert raw analysis into friendly, actionable financial advice
- Estimates potential monthly savings

## Tech Stack

- **Backend:** Python, Flask, Pandas
- **AI:** Google Gemini API (`gemini-3.6-flash`)
- **Frontend:** HTML, CSS, JavaScript

## How to run locally

1. Clone the repo
2. Create a virtual environment: `python3 -m venv venv`
3. Activate it: `source venv/bin/activate`
4. Install dependencies: `pip install pandas flask flask-cors python-dotenv google-genai`
5. Create a `.env` file with your `GEMINI_API_KEY`
6. Run the backend: `python app.py`
7. Open `index.html` in a browser (or use Live Server)

## Project Structure

project/
├── app.py # Flask backend + Gemini AI integration
├── main.py # Standalone analysis script (CLI version)
├── index.html # Frontend UI
├── style.css # Styling
├── script.js # Frontend logic
├── transactions.csv # Sample subscription data
└── requirements.txt # Python dependencies

## Author

Vishal Dubey — B.Tech AIML Student