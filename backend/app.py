from flask import Flask, request, jsonify
from flask_cors import CORS
from main import ask_groq
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    
    if not user_message:
        return jsonify({'error': 'No message provided'}), 400
    
    try:
        response = ask_groq(user_message)
        return jsonify({
            'explanation': response,
            'analogy': "Here's an analogy to help you understand...",
            'codeSnippet': "// Example code will be here...",
            'difficulty': 'intermediate'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 