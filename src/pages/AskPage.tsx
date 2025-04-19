
import React, { useState } from 'react';
import { Mic, Volume2, BookmarkPlus, Send, BookOpen, Youtube } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LoadingAnimation from '@/components/common/LoadingAnimation';
import { useToast } from "@/hooks/use-toast";
import FeatureSelector, { FeatureToggles } from '@/components/features/FeatureSelector';
import QuestionStore from '@/utils/questionStore';

const AskPage = () => {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<null | {
    explanation: string;
    analogy: string;
    codeSnippet: string;
    books?: { title: string; link: string }[];
    videos?: { title: string; url: string }[];
    chart?: string;
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
  }>(null);
  const { toast } = useToast();
  
  const [features, setFeatures] = useState<FeatureToggles>({
    booksReference: false,
    youtubeLinks: false,
    graphicalView: false,
    difficultyLevels: false,
    weekendChallenge: false,
    quizMode: false,
  });

  const handleFeatureToggle = (key: keyof FeatureToggles) => {
    setFeatures(prev => ({ ...prev, [key]: !prev[key] }));
  };

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
    
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const mockResult = {
        explanation: `Here's an explanation of "${topic}"...`,
        analogy: "Think of it like...",
        codeSnippet: "// Example code...",
        ...(features.booksReference && {
          books: [
            { title: "Essential Guide", link: "https://example.com/book1" },
            { title: "Advanced Topics", link: "https://example.com/book2" },
          ]
        }),
        ...(features.youtubeLinks && {
          videos: [
            { title: "Quick Tutorial", url: "https://youtube.com/watch?v=123" },
            { title: "Deep Dive", url: "https://youtube.com/watch?v=456" },
          ]
        }),
        ...(features.difficultyLevels && {
          difficulty: "intermediate" as 'beginner' | 'intermediate' | 'advanced'
        }),
        ...(features.graphicalView && {
          chart: "data:image/svg+xml,..." // Mock chart data
        })
      };

      // Save the question and explanation to QuestionStore
      QuestionStore.saveQuestion(topic, mockResult.explanation);
      
      setResult(mockResult);
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
        
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="glass-card p-6">
            <div className="mb-4">
              <FeatureSelector 
                features={features} 
                onFeatureToggle={handleFeatureToggle} 
              />
            </div>
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
            
            {/* Books References */}
            {features.booksReference && result.books && (
              <div className="glass-card p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Recommended Books</h2>
                </div>
                <div className="space-y-4">
                  {result.books.map((book, index) => (
                    <a
                      key={index}
                      href={book.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
                    >
                      <BookOpen className="h-5 w-5 mb-2 text-primary" />
                      <h3 className="font-medium">{book.title}</h3>
                    </a>
                  ))}
                </div>
              </div>
            )}
            
            {/* YouTube Videos */}
            {features.youtubeLinks && result.videos && (
              <div className="glass-card p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Related Videos</h2>
                </div>
                <div className="space-y-4">
                  {result.videos.map((video, index) => (
                    <a
                      key={index}
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
                    >
                      <Youtube className="h-5 w-5 mb-2 text-red-500" />
                      <h3 className="font-medium">{video.title}</h3>
                    </a>
                  ))}
                </div>
              </div>
            )}
            
            {/* Difficulty Level */}
            {features.difficultyLevels && result.difficulty && (
              <div className="glass-card p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Difficulty Level</h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    result.difficulty === 'beginner' ? 'bg-green-500/20 text-green-500' :
                    result.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-500' :
                    'bg-red-500/20 text-red-500'
                  }`}>
                    {result.difficulty.charAt(0).toUpperCase() + result.difficulty.slice(1)}
                  </span>
                </div>
              </div>
            )}
            
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
