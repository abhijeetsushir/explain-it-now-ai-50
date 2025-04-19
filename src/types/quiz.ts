
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizGenre {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  questions: QuizQuestion[];
}
