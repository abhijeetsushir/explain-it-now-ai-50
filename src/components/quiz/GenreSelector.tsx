import React from 'react';
import { Brain, Calculator, Globe, Atom, BookOpen, Pencil, FlaskConical, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuizGenre } from '@/types/quiz';

const quizGenres: QuizGenre[] = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: <Calculator className="w-6 h-6" />,
    description: 'Test your mathematical skills',
    questions: [
      {
        id: 1,
        question: "What is the value of π (pi) to two decimal places?",
        options: ["3.12", "3.14", "3.16", "3.18"],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: "What is the square root of 144?",
        options: ["10", "11", "12", "13"],
        correctAnswer: 2,
      },
      {
        id: 3,
        question: "What is the result of 7 × 8?",
        options: ["54", "56", "58", "60"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 'science',
    name: 'Science',
    icon: <Atom className="w-6 h-6" />,
    description: 'Explore scientific concepts',
    questions: [
      {
        id: 1,
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Fe", "Cu"],
        correctAnswer: 0,
      },
      {
        id: 2,
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Jupiter", "Mars", "Saturn"],
        correctAnswer: 2,
      },
      {
        id: 3,
        question: "What is the largest organ in the human body?",
        options: ["Heart", "Brain", "Liver", "Skin"],
        correctAnswer: 3,
      },
    ],
  },
  {
    id: 'history',
    name: 'History',
    icon: <Globe className="w-6 h-6" />,
    description: 'Journey through historical events',
    questions: [
      {
        id: 1,
        question: "In which year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correctAnswer: 2,
      },
      {
        id: 2,
        question: "Who was the first President of the United States?",
        options: ["John Adams", "Thomas Jefferson", "Benjamin Franklin", "George Washington"],
        correctAnswer: 3,
      },
      {
        id: 3,
        question: "Which ancient civilization built the pyramids?",
        options: ["Romans", "Greeks", "Egyptians", "Mayans"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 'literature',
    name: 'Literature',
    icon: <BookOpen className="w-6 h-6" />,
    description: 'Test your literary knowledge',
    questions: [
      {
        id: 1,
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: "What is the main theme of 'To Kill a Mockingbird'?",
        options: ["Love", "Justice", "War", "Nature"],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: "Which of these is a poem by Robert Frost?",
        options: ["The Raven", "The Road Not Taken", "The Waste Land", "Howl"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 'language',
    name: 'Language Arts',
    icon: <Pencil className="w-6 h-6" />,
    description: 'Improve your language skills',
    questions: [
      {
        id: 1,
        question: "What is a synonym for 'happy'?",
        options: ["Sad", "Joyful", "Angry", "Tired"],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: "Which word is an antonym of 'dark'?",
        options: ["Black", "Night", "Light", "Dim"],
        correctAnswer: 2,
      },
      {
        id: 3,
        question: "What type of word is 'quickly'?",
        options: ["Noun", "Verb", "Adjective", "Adverb"],
        correctAnswer: 3,
      },
    ],
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    icon: <FlaskConical className="w-6 h-6" />,
    description: 'Master chemical concepts',
    questions: [
      {
        id: 1,
        question: "What is H2O?",
        options: ["Carbon Dioxide", "Oxygen", "Water", "Hydrogen"],
        correctAnswer: 2,
      },
      {
        id: 2,
        question: "What is the atomic number of Carbon?",
        options: ["4", "6", "8", "12"],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: "Which is a noble gas?",
        options: ["Helium", "Oxygen", "Hydrogen", "Carbon"],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 'biology',
    name: 'Biology',
    icon: <Brain className="w-6 h-6" />,
    description: 'Explore life sciences',
    questions: [
      {
        id: 1,
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi Body"],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: "Which blood type is known as the universal donor?",
        options: ["A+", "B+", "AB+", "O-"],
        correctAnswer: 3,
      },
      {
        id: 3,
        question: "What is the process by which plants make their food?",
        options: ["Respiration", "Photosynthesis", "Digestion", "Absorption"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 'civics',
    name: 'Civics',
    icon: <Scale className="w-6 h-6" />,
    description: 'Learn about government and citizenship',
    questions: [
      {
        id: 1,
        question: "What are the three branches of government?",
        options: [
          "Executive, Legislative, Judicial",
          "Federal, State, Local",
          "President, Congress, Senate",
          "Military, Civilian, Judicial"
        ],
        correctAnswer: 0,
      },
      {
        id: 2,
        question: "What document begins with 'We the People'?",
        options: [
          "Declaration of Independence",
          "Bill of Rights",
          "Constitution",
          "Emancipation Proclamation"
        ],
        correctAnswer: 2,
      },
      {
        id: 3,
        question: "What is the minimum voting age in most countries?",
        options: ["16", "17", "18", "21"],
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
