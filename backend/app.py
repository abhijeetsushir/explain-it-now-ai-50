
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from main import ask_groq
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Check if API key is available
api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    print("WARNING: GROQ_API_KEY not found in environment variables")

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.post("/api/chat")
async def chat(request: ChatRequest):
    if not request.message:
        raise HTTPException(status_code=400, detail="No message provided")
    
    if not api_key:
        raise HTTPException(status_code=500, detail="GROQ API key not configured on the server")
    
    try:
        response = ask_groq(request.message)
        
        # If the response is an error message from our function
        if response.startswith("Error in Groq API call:"):
            raise HTTPException(status_code=500, detail=response)
            
        return {
            'explanation': response,
            'analogy': 'Coming soon...',
            'codeSnippet': 'Coming soon...',
            'difficulty': 'intermediate'
        }
    except Exception as e:
        print(f"Exception in /api/chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
async def health_check():
    """Health check endpoint to verify the backend is running"""
    return {
        'status': 'online',
        'api_key_configured': bool(api_key)
    }

if __name__ == '__main__':
    import uvicorn
    print("Starting FastAPI server on http://localhost:5000")
    print(f"GROQ API key configured: {bool(api_key)}")
    uvicorn.run(app, host="0.0.0.0", port=5000)
