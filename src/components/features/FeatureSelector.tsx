
import React from 'react';
import { BookOpen, Youtube, BarChart2, Target, Trophy, Award } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';

export interface FeatureToggles {
  booksReference: boolean;
  youtubeLinks: boolean;
  graphicalView: boolean;
  difficultyLevels: boolean;
  weekendChallenge: boolean;
  quizMode: boolean;
}

interface FeatureSelectorProps {
  features: FeatureToggles;
  onFeatureToggle: (key: keyof FeatureToggles) => void;
}

const FeatureSelector = ({ features, onFeatureToggle }: FeatureSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Toggle
        pressed={features.booksReference}
        onPressedChange={() => onFeatureToggle('booksReference')}
        className="data-[state=on]:bg-primary/20 data-[state=on]:text-primary"
      >
        <BookOpen className="h-4 w-4 mr-2" />
        Books
      </Toggle>
      
      <Toggle
        pressed={features.youtubeLinks}
        onPressedChange={() => onFeatureToggle('youtubeLinks')}
        className="data-[state=on]:bg-red-500/20 data-[state=on]:text-red-500"
      >
        <Youtube className="h-4 w-4 mr-2" />
        Videos
      </Toggle>
      
      <Toggle
        pressed={features.graphicalView}
        onPressedChange={() => onFeatureToggle('graphicalView')}
        className="data-[state=on]:bg-secondary/20 data-[state=on]:text-secondary"
      >
        <BarChart2 className="h-4 w-4 mr-2" />
        Graphs
      </Toggle>
      
      <Toggle
        pressed={features.difficultyLevels}
        onPressedChange={() => onFeatureToggle('difficultyLevels')}
        className="data-[state=on]:bg-yellow-500/20 data-[state=on]:text-yellow-500"
      >
        <Target className="h-4 w-4 mr-2" />
        Levels
      </Toggle>
      
      <Toggle
        pressed={features.weekendChallenge}
        onPressedChange={() => onFeatureToggle('weekendChallenge')}
        className="data-[state=on]:bg-purple-500/20 data-[state=on]:text-purple-500"
      >
        <Trophy className="h-4 w-4 mr-2" />
        Challenge
      </Toggle>
      
      <Toggle
        pressed={features.quizMode}
        onPressedChange={() => onFeatureToggle('quizMode')}
        className="data-[state=on]:bg-green-500/20 data-[state=on]:text-green-500"
      >
        <Award className="h-4 w-4 mr-2" />
        Quiz
      </Toggle>
    </div>
  );
};

export default FeatureSelector;
