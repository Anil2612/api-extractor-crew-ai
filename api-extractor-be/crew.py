from crewai import Crew
from agents.fetch_api_agent import fetch_api_agent
from tasks.fetch_api_task import fetch_api_task;


api_extractor_crew = Crew(
    agents=[
        fetch_api_agent,
    ],
    tasks=[
        fetch_api_task,
    ],
    verbose=True
)