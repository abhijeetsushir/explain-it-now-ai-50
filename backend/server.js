
const express = require('express');
const cors = require('cors');
const { Groq } = require('groq');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Groq client
const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function askGroq(prompt) {
  try {
    console.log(`Sending request to Groq API with prompt: ${prompt.slice(0, 50)}...`);
    
    const chatCompletion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an educational AI assistant that explains complex topics clearly and concisely. Provide accurate information with examples when relevant."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1000
    });
    
    console.log("Successfully received response from Groq API");
    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.error("Error in Groq API call:", error);
    throw error;
  }
}

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'No message provided' });
  }
  
  try {
    const response = await askGroq(message);
    res.json({
      explanation: response,
      analogy: 'Coming soon...',
      codeSnippet: 'Coming soon...',
      difficulty: 'intermediate'
    });
  } catch (error) {
    console.error('Error processing chat request:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    api_key_configured: !!process.env.GROQ_API_KEY
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GROQ API key configured: ${!!process.env.GROQ_API_KEY}`);
});
