
import os
from dotenv import load_dotenv
from groq import Groq

# Load environment variables
load_dotenv()

# Initialize Groq client with API key validation
api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    print("WARNING: GROQ_API_KEY not found in environment variables")

client = Groq(api_key=api_key)

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
    if not api_key:
        return "Error: GROQ API key not configured. Please set the GROQ_API_KEY environment variable."
    
    try:
        print(f"Sending request to Groq API with prompt: {prompt[:50]}...")
        
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are an educational AI assistant that explains complex topics clearly and concisely. Provide accurate information with examples when relevant."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            model=model,
            temperature=temperature,
            max_tokens=max_tokens
        )
        
        print("Successfully received response from Groq API")
        return chat_completion.choices[0].message.content
    
    except Exception as e:
        error_message = f"Error in Groq API call: {str(e)}"
        print(error_message)
        return error_message

# Optional: Test function if script is run directly
if __name__ == "__main__":
    test_prompt = "Explain quantum computing in simple terms"
    response = ask_groq(test_prompt)
    print("Groq API Response:")
    print(response)
