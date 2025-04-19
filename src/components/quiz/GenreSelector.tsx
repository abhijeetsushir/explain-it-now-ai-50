import React from 'react';
import { Book, Brain, Music, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuizGenre } from '@/types/quiz';

const quizGenres: QuizGenre[] = [
  {
    id: 'programming',
    name: 'Programming',
    icon: <Brain className="w-6 h-6" />,
    description: 'Test your programming knowledge',
    questions: [
      {
        id: 1,
        question: "Which hook is used for side effects in React?",
        options: ["useState", "useEffect", "useContext", "useReducer"],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: "What does the Virtual DOM do in React?",
        options: [
          "Directly manipulates the browser's DOM",
          "Creates a copy of the browser's DOM in memory",
          "Eliminates the need for a DOM altogether",
          "Slows down rendering for precision",
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: "Which of these is NOT a React Hook?",
        options: ["useRef", "useFetch", "useContext", "useReducer"],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: "How do you update state in React?",
        options: [
          "Directly modify the state object",
          "Using setState or a setter from useState",
          "By returning a new component",
          "Using the this.state property",
        ],
        correctAnswer: 1,
      },
      {
        id: 5,
        question: "What is the purpose of keys in React lists?",
        options: [
          "To style list items differently",
          "To help React identify which items have changed, added, or removed",
          "To provide accessibility features",
          "To encrypt the list data",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 'movies',
    name: 'Movies',
    icon: <Film className="w-6 h-6" />,
    description: 'Challenge yourself with movie trivia',
    questions: [
      {
        id: 1,
        question: "Who directed Inception?",
        options: ["Christopher Nolan", "Steven Spielberg", "Martin Scorsese", "Quentin Tarantino"],
        correctAnswer: 0,
      },
      {
        id: 2,
        question: "What year was The Matrix released?",
        options: ["1998", "1999", "2000", "2001"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 'music',
    name: 'Music',
    icon: <Music className="w-6 h-6" />,
    description: 'Test your music knowledge',
    questions: [
      {
        id: 1,
        question: "Who is known as the 'King of Pop'?",
        options: ["Elvis Presley", "Michael Jackson", "Prince", "Justin Timberlake"],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: "Which band performed 'Bohemian Rhapsody'?",
        options: ["The Beatles", "Led Zeppelin", "Queen", "Pink Floyd"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 'literature',
    name: 'Literature',
    icon: <Book className="w-6 h-6" />,
    description: 'Challenge your literary knowledge',
    questions: [
      {
        id: 1,
        question: "Who wrote '1984'?",
        options: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "Ernest Hemingway"],
        correctAnswer: 0,
      },
      {
        id: 2,
        question: "What's the first book in the Harry Potter series?",
        options: [
          "Chamber of Secrets",
          "Prisoner of Azkaban",
          "Philosopher's Stone",
          "Goblet of Fire"
        ],
        correctAnswer: 2,
      },
    ],
  },
];

interface GenreSelectorProps {
  onGenreSelect: (genre: QuizGenre) => void;
}

const GenreSelector: React.FC<GenreSelectorProps> = ({ onGenreSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {quizGenres.map((genre) => (
        <Button
          key={genre.id}
          onClick={() => onGenreSelect(genre)}
          variant="outline"
          className="h-auto p-6 flex flex-col items-center gap-4 hover:bg-accent group"
        >
          <div className="text-primary group-hover:scale-110 transition-transform">
            {genre.icon}
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">{genre.name}</h3>
            <p className="text-sm text-muted-foreground">{genre.description}</p>
          </div>
        </Button>
      ))}
    </div>
  );
};

export { quizGenres };
export default GenreSelector;
