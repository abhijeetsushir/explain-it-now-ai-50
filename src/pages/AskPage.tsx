
import React, { useState } from 'react';
import { Mic, Volume2, BookmarkPlus, Send } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import LoadingAnimation from '@/components/common/LoadingAnimation';
import { useToast } from "@/hooks/use-toast";

const AskPage = () => {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<null | {
    explanation: string;
    analogy: string;
    codeSnippet: string;
  }>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!topic.trim()) {
      toast({
        title: "Please enter a topic",
        description: "You need to enter a question or topic first.",
        variant: "destructive",
      });
      return;
    }
    
    // Mock API call
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      // Mock response
      setResult({
        explanation: `Here's an explanation of "${topic}": \n\nArtificial Intelligence (AI) is a field of computer science focused on creating systems that can perform tasks that typically require human intelligence. These include problem-solving, recognizing speech, understanding natural language, making decisions, and learning from experience. \n\nModern AI systems use large amounts of data to learn patterns and make predictions or decisions without being explicitly programmed for every possible scenario.`,
        analogy: `Think of AI like teaching a child: At first, you show them many examples (data) of what cats and dogs look like. Over time, they learn to recognize the patterns themselves, even when seeing new animals they haven't seen before. Similarly, AI systems learn from examples to recognize patterns in data.`,
        codeSnippet: `# Simple example of machine learning with scikit-learn
from sklearn.ensemble import RandomForestClassifier

# Create and train a model
model = RandomForestClassifier() 
model.fit(training_data, training_labels)

# Make predictions
predictions = model.predict(new_data)
`,
      });
      setIsLoading(false);
    }, 2000);
  };
  
  const handleVoiceInput = () => {
    toast({
      title: "Voice input activated",
      description: "Please speak your question clearly...",
    });
    // Voice input would be implemented here
  };
  
  const handleReadAloud = (text: string) => {
    toast({
      title: "Reading aloud",
      description: "Text is being read aloud...",
    });
    // Text-to-speech would be implemented here
  };
  
  const handleSaveToLibrary = () => {
    toast({
      title: "Saved to library",
      description: "This explanation has been saved to your library.",
    });
    // Save to library logic would be implemented here
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Ask Anything</h1>
        
        {/* Question Input */}
        <form onSubmit={handleSubmit} className="mb-10">
          <div className="glass-card p-6">
            <div className="flex items-center">
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter any topic or question..."
                className="flex-grow text-lg bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
              />
              <Button 
                type="button" 
                variant="ghost"
                onClick={handleVoiceInput}
                className="ml-2"
              >
                <Mic className="h-5 w-5 text-primary" />
              </Button>
              <Button 
                type="submit"
                className="ml-2 bg-primary hover:bg-primary/90 text-white"
              >
                <Send className="h-4 w-4 mr-2" />
                Explain
              </Button>
            </div>
          </div>
        </form>
        
        {/* Loading Animation */}
        {isLoading && (
          <div className="flex justify-center my-16">
            <LoadingAnimation />
          </div>
        )}
        
        {/* Results */}
        {result && !isLoading && (
          <div className="space-y-8 animate-scale-up">
            {/* Explanation Card */}
            <div className="glass-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Explanation</h2>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleReadAloud(result.explanation)}
                  >
                    <Volume2 className="h-4 w-4 mr-2" />
                    Read Aloud
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleSaveToLibrary}
                  >
                    <BookmarkPlus className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <p className="whitespace-pre-line">{result.explanation}</p>
              </div>
            </div>
            
            {/* Analogy Card */}
            <div className="glass-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Real-World Analogy</h2>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleReadAloud(result.analogy)}
                  >
                    <Volume2 className="h-4 w-4 mr-2" />
                    Read Aloud
                  </Button>
                </div>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <p>{result.analogy}</p>
              </div>
            </div>
            
            {/* Code Snippet Card */}
            <div className="glass-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Code Example</h2>
              </div>
              <div className="bg-foreground/5 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm font-mono">
                  <code>{result.codeSnippet}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
        
        {/* Suggestion Prompts */}
        {!result && !isLoading && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-center mb-6">Try asking about...</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={() => setTopic("Explain machine learning like I'm 5")}
                className="glass-card p-4 text-left hover:shadow-lg transition-shadow"
              >
                <p className="font-medium">Explain machine learning like I'm 5</p>
              </button>
              <button 
                onClick={() => setTopic("How does JavaScript async/await work?")}
                className="glass-card p-4 text-left hover:shadow-lg transition-shadow"
              >
                <p className="font-medium">How does JavaScript async/await work?</p>
              </button>
              <button 
                onClick={() => setTopic("What is quantum computing?")}
                className="glass-card p-4 text-left hover:shadow-lg transition-shadow"
              >
                <p className="font-medium">What is quantum computing?</p>
              </button>
              <button 
                onClick={() => setTopic("React component lifecycle explained")}
                className="glass-card p-4 text-left hover:shadow-lg transition-shadow"
              >
                <p className="font-medium">React component lifecycle explained</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AskPage;
