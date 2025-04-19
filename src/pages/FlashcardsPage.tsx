
import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import GradientButton from '@/components/ui/GradientButton';

// Mock flashcard data
const mockFlashcards = [
  {
    id: 1,
    front: "What is React?",
    back: "React is a JavaScript library for building user interfaces, particularly single-page applications where UI updates are frequent."
  },
  {
    id: 2,
    front: "Explain the concept of state in React",
    back: "State is a JavaScript object that stores component data that may change over time, triggering re-renders when updated through setState()."
  },
  {
    id: 3,
    front: "What is the Virtual DOM?",
    back: "The Virtual DOM is a lightweight copy of the real DOM that React uses to optimize rendering performance by minimizing direct manipulations of the actual DOM."
  },
  {
    id: 4,
    front: "What are React Hooks?",
    back: "Hooks are functions that let you use state and other React features in functional components without writing a class."
  },
  {
    id: 5,
    front: "Explain useEffect in React",
    back: "useEffect is a React Hook that lets you synchronize a component with an external system or perform side effects after rendering."
  }
];

const FlashcardsPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completedCards, setCompletedCards] = useState<number[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const currentCard = mockFlashcards[currentIndex];
  
  // Handle navigation between cards
  const goToNextCard = () => {
    if (cardRef.current) {
      cardRef.current.classList.add('opacity-0');
      setTimeout(() => {
        setIsFlipped(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % mockFlashcards.length);
        cardRef.current?.classList.remove('opacity-0');
      }, 300);
    }
  };
  
  const goToPrevCard = () => {
    if (cardRef.current) {
      cardRef.current.classList.add('opacity-0');
      setTimeout(() => {
        setIsFlipped(false);
        setCurrentIndex((prevIndex) => 
          prevIndex === 0 ? mockFlashcards.length - 1 : prevIndex - 1
        );
        cardRef.current?.classList.remove('opacity-0');
      }, 300);
    }
  };
  
  // Flip card
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };
  
  // Mark card as complete
  const markComplete = () => {
    if (!completedCards.includes(currentCard.id)) {
      setCompletedCards([...completedCards, currentCard.id]);
    }
    goToNextCard();
  };
  
  // Reset all cards
  const resetCards = () => {
    setCompletedCards([]);
    setCurrentIndex(0);
    setIsFlipped(false);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">Flashcards</h1>
            <div className="text-foreground/70">
              {completedCards.length}/{mockFlashcards.length} reviewed
            </div>
          </div>
          
          {/* Flashcard */}
          <div className="relative h-80 md:h-96 mb-10">
            <div
              ref={cardRef}
              className="w-full h-full perspective-1000 cursor-pointer transition-opacity duration-300"
              onClick={flipCard}
            >
              <div 
                className={`relative w-full h-full preserve-3d transition-transform duration-600 ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front side */}
                <div className="absolute w-full h-full backface-hidden glass-card p-8 flex flex-col items-center justify-center">
                  <h2 className="text-2xl font-bold mb-4 text-center">{currentCard.front}</h2>
                  <p className="text-center text-foreground/70">Tap to flip</p>
                  
                  {/* Completion Status */}
                  {completedCards.includes(currentCard.id) && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-green-500/20 text-green-600 dark:text-green-400 text-xs px-2 py-1 rounded-full">
                        Completed
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Back side */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 glass-card p-8 flex flex-col">
                  <h3 className="text-xl font-semibold mb-4 text-center">Answer:</h3>
                  <p className="flex-grow text-center flex items-center justify-center">
                    {currentCard.back}
                  </p>
                  
                  {/* Mark as complete button - only shown on back */}
                  <div className="mt-4 flex justify-center">
                    <Button
                      className={`${
                        completedCards.includes(currentCard.id)
                          ? 'bg-green-500 hover:bg-green-600'
                          : 'bg-primary hover:bg-primary/90'
                      } text-white`}
                      onClick={(e) => {
                        e.stopPropagation();
                        markComplete();
                      }}
                    >
                      {completedCards.includes(currentCard.id)
                        ? 'Already Completed'
                        : 'Mark as Complete'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation buttons */}
            <button 
              className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 md:-translate-x-8 
                         rounded-full w-10 h-10 bg-background border border-border flex items-center 
                         justify-center shadow-md z-10 hover:bg-muted transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevCard();
              }}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <button 
              className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-4 md:translate-x-8 
                         rounded-full w-10 h-10 bg-background border border-border flex items-center 
                         justify-center shadow-md z-10 hover:bg-muted transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                goToNextCard();
              }}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          
          {/* Progress indicators */}
          <div className="flex justify-center gap-2 mb-10">
            {mockFlashcards.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full ${
                  idx === currentIndex
                    ? 'bg-primary'
                    : completedCards.includes(mockFlashcards[idx].id)
                    ? 'bg-green-500'
                    : 'bg-muted'
                }`}
                onClick={() => {
                  setIsFlipped(false);
                  setCurrentIndex(idx);
                }}
              />
            ))}
          </div>
          
          {/* Controls */}
          <div className="flex justify-center">
            <GradientButton 
              variant="secondary"
              onClick={resetCards}
              className="inline-flex items-center"
            >
              <RotateCw className="h-4 w-4 mr-2" />
              Reset All Cards
            </GradientButton>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FlashcardsPage;
