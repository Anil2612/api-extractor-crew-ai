from dotenv import load_dotenv
from crew import resume_crew

load_dotenv()

def run(topic: str):
    result = resume_crew.kickoff(inputs={"prompt": topic})

    print("-"*50)
    print(result)
    print("-" * 50)

if __name__ == "__main__":
    topic = (
        "API Agents"
    )

    run(topic)
