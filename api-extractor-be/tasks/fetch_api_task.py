import textwrap
from crewai import Task
from agents.fetch_api_agent import fetch_api_agent

fetch_api_task = Task(
    agent=fetch_api_agent,
    description = textwrap.dedent("""
    Respond by selecting the correct object from the given JSON array of objects.
    Instructions:
    1. Analyze the user's prompt: {prompt}
    2. Use the provided JSON data: {data}
    3. Identify which single object best matches the query based on its "description" or other fields.
    4. If no object is relevant, reply with: "No relevant object found."
    5. For the selected object, construct a new key called "payload".
       - The object may contain a "payload" schema where keys map to expected data types (e.g., string, int, boolean).
       - Based on the user prompt, replace each data type with an appropriate value extracted or inferred from the prompt.
       - If a value cannot be inferred, leave it as null.
    Output:
    - Return a single JSON object that merges the matched object with the correctly filled "payload".
    - The response must be valid JSON so it can be parsed programmatically.
"""),
    expected_output = "A single JSON object that best matches the user prompt, merged with a filled 'payload', or 'No relevant object found'."
)
