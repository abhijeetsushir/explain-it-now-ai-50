import React, { useState, useEffect, useMemo } from 'react';
import { Clock, Trophy, Award, RefreshCw } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import GradientButton from '@/components/ui/GradientButton';
import { Progress } from '@/components/ui/progress';
import QuestionStore from '@/utils/questionStore';

// Add the missing getFeedback function
const getFeedback = (score: number, total: number) => {
  const percentage = (score / total) * 100;
  
  if (percentage >= 90) {
    return "Outstanding! You're a master of this subject!";
  } else if (percentage >= 75) {
    return "Great job! You really know your stuff!";
  } else if (percentage >= 60) {
    return "Good work! You're on the right track.";
  } else if (percentage >= 40) {
    return "Not bad! Keep studying and you'll improve.";
  } else {
    return "Keep practicing! Everyone starts somewhere.";
  }
};

const QuizPage = () => {
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [quizComplete, setQuizComplete] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Get questions from the QuestionStore
  const questions = useMemo(() => QuestionStore.generateQuizQuestions(), []);
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  
  // Timer
  useEffect(() => {
    if (quizComplete) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          endQuiz();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [quizComplete]);
  
  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Handle option selection
  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswered) return;
    
    setSelectedOption(optionIndex);
    setIsAnswered(true);
    
    // Check if correct and update score
    if (optionIndex === currentQuestion.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 1500);
    }
    
    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestionIndex === totalQuestions - 1) {
        endQuiz();
      } else {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      }
    }, 1500);
  };
  
  // End quiz
  const endQuiz = () => {
    setQuizComplete(true);
  };
  
  const startNewQuiz = () => {
    window.location.reload(); // Reload to get fresh questions
  };
  
  if (questions.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 text-center py-12">
          <div className="glass-card p-8 max-w-md mx-auto">
            <Trophy className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h1 className="text-2xl font-bold mb-4">No Questions Available</h1>
            <p className="text-foreground/70 mb-6">
              Try asking some questions in the Ask tab first. Your questions will be used to generate a personalized quiz!
            </p>
            <Button onClick={() => window.location.href = '/ask'}>
              Go to Ask Page
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {!quizComplete ? (
            <>
              {/* Quiz header with progress and timer */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold">Quiz Time</h1>
                  <p className="text-foreground/70">Test your knowledge</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <span>{score}/{totalQuestions}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-muted">
                    <Clock className="h-4 w-4" />
                    <span className={`${timeLeft < 10 ? 'text-red-500' : ''}`}>
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm mb-2">
                  <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                  <span>{Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%</span>
                </div>
                <Progress
                  value={((currentQuestionIndex + 1) / totalQuestions) * 100}
                  className="h-2"
                />
              </div>
              
              {/* Question card */}
              <div className="glass-card p-6 mb-8">
                <h2 className="text-xl font-bold mb-6">{currentQuestion.question}</h2>
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      className={`w-full p-4 border rounded-lg text-left transition-all ${
                        selectedOption === index 
                          ? index === currentQuestion.correctAnswer
                            ? 'bg-green-500/20 border-green-500'
                            : 'bg-red-500/20 border-red-500'
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => handleOptionSelect(index)}
                      disabled={isAnswered}
                    >
                      <span className="font-medium">
                        {String.fromCharCode(65 + index)}. {option}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Feedback tooltip */}
              {showFeedback && selectedOption === currentQuestion.correctAnswer && (
                <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                               bg-green-500 text-white px-6 py-3 rounded-full font-bold animate-bounce-light">
                  Nailed it! 🎯
                </div>
              )}
            </>
          ) : (
            /* Quiz results */
            <div className="glass-card p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-candy flex items-center justify-center">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Quiz Complete!</h1>
              <p className="text-lg mb-6">{getFeedback(score, totalQuestions)}</p>
              
              <div className="glass-card p-6 mb-8 max-w-sm mx-auto">
                <div className="flex justify-between mb-2">
                  <span>Final Score:</span>
                  <span className="font-bold">{score}/{totalQuestions}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Accuracy:</span>
                  <span className="font-bold">{Math.round((score / totalQuestions) * 100)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Time Used:</span>
                  <span className="font-bold">{60 - timeLeft} seconds</span>
                </div>
              </div>
              
              <GradientButton onClick={startNewQuiz} className="inline-flex items-center">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </GradientButton>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default QuizPage;
