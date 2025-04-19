
from flask import Flask, request, jsonify
from flask_cors import CORS
from main import ask_groq
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Check if API key is available
api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    print("WARNING: GROQ_API_KEY not found in environment variables")

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    
    if not user_message:
        return jsonify({'error': 'No message provided'}), 400
    
    if not api_key:
        return jsonify({'error': 'GROQ API key not configured on the server'}), 500
    
    try:
        # Use the updated ask_groq function from main.py
        response = ask_groq(user_message)
        
        # If the response is an error message from our function
        if response.startswith("Error in Groq API call:"):
            return jsonify({'error': response}), 500
            
        return jsonify({
            'explanation': response,
            # For now, we'll hardcode these values since they're not coming from Groq
            'analogy': 'Analogy would be generated here',
            'codeSnippet': 'Code snippet would be generated here',
            'difficulty': 'intermediate'
        })
    except Exception as e:
        print(f"Exception in /api/chat endpoint: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint to verify the backend is running"""
    return jsonify({
        'status': 'online',
        'api_key_configured': bool(api_key)
    })

if __name__ == '__main__':
    print("Starting Flask server on http://localhost:5000")
    print(f"GROQ API key configured: {bool(api_key)}")
    app.run(debug=True, port=5000, host='0.0.0.0')
