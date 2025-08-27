import os
from crewai import Agent, LLM

model = os.getenv("PERSON_AGENT_LLM")

llm = LLM(model=model)

fetch_api_agent = Agent(
    role="Smart JSON Data Extractor",
    goal="Given a user query and a JSON array of objects, return the object(s) that best match the query.",
    backstory=(
        "You are an expert at reading structured JSON data. "
        "The user will provide a JSON array of objects and ask a question. "
        "Your task is to carefully analyze the query and extract the most relevant object(s) "
        "from the JSON array. If no object matches, respond with 'No relevant object found'."
    ),
    llm=llm,
    verbose=True,
)