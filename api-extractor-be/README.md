# API Extractor Website Backend

This repository contains the Python backend code for my api extractor website, built using [CrewAI](https://crewai.com/).

---

## About

This backend service powers the api website by providing APIs and integrations implemented with Python. It leverages CrewAI for intelligent features and smooth management of content.

---

## Features

- RESTful API endpoints to serve api data
- Integration with CrewAI for advanced functionality
- Environment-based configuration
- Easy to extend and customize

---

## Technologies Used

- Python 3.x
- FastAPI / Flask (adjust depending on your framework)
- CrewAI SDK
- Other dependencies (see requirements.txt)

---

## Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/Anil2612/api-extractor-crew-ai
cd api-extractor-be


# Create venv
python3 -m venv venv

# Activate venv (macOS/Linux)
source venv/bin/activate

pip install --upgrade pip
pip install -r requirements.txt

uvicorn app:app --reload
