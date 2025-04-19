
import os
from dotenv import load_dotenv
from groq import Groq

# Load environment variables
load_dotenv()

# Initialize Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def ask_groq(prompt, model="llama-3-70b-8192", temperature=0.7, max_tokens=1000):
    """
    Send a prompt to Groq API 
    
    Args:
        prompt (str): The user's input prompt
        model (str): The Groq model to use
        temperature (float): Creativity of the response
        max_tokens (int): Maximum length of response
        
    Returns:
        str: The model's response
    """
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            model=model,
            temperature=temperature,
            max_tokens=max_tokens
        )
        
        return chat_completion.choices[0].message.content
    
    except Exception as e:
        print(f"Error in Groq API call: {str(e)}")
        return f"An error occurred: {str(e)}"

# Optional: Test function if script is run directly
if __name__ == "__main__":
    test_prompt = "Explain quantum computing in simple terms"
    response = ask_groq(test_prompt)
    print("Groq API Response:")
    print(response)

