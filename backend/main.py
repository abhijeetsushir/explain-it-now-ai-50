import requests
import os
from dotenv import load_dotenv
import json

# Load environment variables from .env file
load_dotenv()

# Get API key from environment variables
API_KEY = os.getenv("GROQ_API_KEY")
if not API_KEY:
    raise ValueError("GROQ_API_KEY not found in environment variables. Please set it in .env file")

def ask_groq(prompt, history=[]):
    """
    Send a prompt to Groq API using Llama 2 model
    
    Args:
        prompt (str): The user's input prompt
        history (list): Chat history for context
        
    Returns:
        str: The model's response or error message
    """
    messages = history + [{"role": "user", "content": prompt}]
    url = "https://api.groq.com/openai/v1/chat/completions"
    
    try:
        # Prepare the request payload
        payload = {
            "model": "llama3-70b-8192",  # Using Llama 3 70B model
            "messages": messages,
            "temperature": 0.7,  # Slightly more creative
            "max_tokens": 1000,  # Maximum length of response
            "top_p": 0.9,  # Nucleus sampling
            "stream": False  # Get complete response at once
        }
        
        print(f"\nSending request to Groq API...")
        print(f"Request payload: {json.dumps(payload, indent=2)}")
        
        # Make the API call
        response = requests.post(
            url,
            headers={
                "Authorization": f"Bearer {API_KEY}",
                "Content-Type": "application/json"
            },
            json=payload,
            timeout=30  # 30 second timeout
        )
        
        # Check for HTTP errors
        response.raise_for_status()
        
        # Parse and return the response
        result = response.json()
        return result["choices"][0]["message"]["content"]
    
    except requests.exceptions.RequestException as e:
        print(f"\nError making request to Groq API: {str(e)}")
        if hasattr(e, 'response') and e.response is not None:
            print(f"Response status code: {e.response.status_code}")
            print(f"Response content: {e.response.text}")
        return f"Error: {str(e)}"
    except Exception as e:
        print(f"\nUnexpected error: {str(e)}")
        return f"Error: {str(e)}"

# Test the API
if __name__ == "__main__":
    try:
        # Test with a simple prompt
        test_prompt = "Write a short story about a friendly robot."
        print("\nTesting Groq API with Llama 3...")
        print(f"Using API key: {API_KEY[:10]}...")  # Print first 10 chars for verification
        
        response = ask_groq(test_prompt)
        print("\nResponse from Groq API:")
        print("-" * 50)
        print(response)
        print("-" * 50)
        print("\nAPI test completed!")
        
    except Exception as e:
        print(f"\nError in main: {str(e)}")
