
import React, { useState } from 'react';
import { Search, BookOpen, Filter, Tag } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Mock data for saved explanations
const mockExplanations = [
  {
    id: 1,
    topic: 'React Hooks',
    explanation: 'React Hooks are functions that let you "hook into" React state and lifecycle features from function components...',
    tags: ['frontend', 'javascript', 'react'],
    date: '2025-04-15',
  },
  {
    id: 2,
    topic: 'Neural Networks',
    explanation: 'Neural networks are computing systems vaguely inspired by the biological neural networks that constitute animal brains...',
    tags: ['ai', 'machine learning', 'data science'],
    date: '2025-04-12',
  },
  {
    id: 3,
    topic: 'GraphQL vs REST',
    explanation: 'GraphQL is a query language for APIs and a runtime for executing those queries with your existing data...',
    tags: ['api', 'backend', 'web development'],
    date: '2025-04-10',
  },
  {
    id: 4,
    topic: 'Docker Containers',
    explanation: 'Docker containers are lightweight, standalone, executable packages of software that include everything needed to run an application...',
    tags: ['devops', 'containers', 'infrastructure'],
    date: '2025-04-08',
  },
];

// All unique tags from explanations
const allTags = Array.from(
  new Set(mockExplanations.flatMap(exp => exp.tags))
);

const LibraryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Filter explanations based on search query and selected tags
  const filteredExplanations = mockExplanations.filter(exp => {
    const matchesSearch = exp.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          exp.explanation.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
                        selectedTags.some(tag => exp.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });
  
  // Toggle tag selection
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Your Library</h1>
          <div className="hidden md:flex items-center">
            <Button variant="outline" size="sm" className="mr-4">
              <Filter className="h-4 w-4 mr-2" />
              Sort
            </Button>
            <Button variant="outline" size="sm">
              <Tag className="h-4 w-4 mr-2" />
              Manage Tags
            </Button>
          </div>
        </div>
        
        {/* Search and Filter Section */}
        <div className="glass-card p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search your saved explanations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="md:hidden flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Filter className="h-4 w-4 mr-2" />
                Sort
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Tag className="h-4 w-4 mr-2" />
                Tags
              </Button>
            </div>
          </div>
          
          {/* Tags */}
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Badge 
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        {/* Explanation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredExplanations.length > 0 ? (
            filteredExplanations.map((exp) => (
              <div 
                key={exp.id} 
                className="glass-card p-6 card-hover"
              >
                <h3 className="text-xl font-bold mb-2">{exp.topic}</h3>
                <p className="text-foreground/70 mb-4 line-clamp-3">{exp.explanation}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {exp.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-foreground/60">{exp.date}</span>
                  <Button size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Open
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">No explanations found</h3>
              <p className="text-foreground/70">
                {searchQuery || selectedTags.length > 0
                  ? "Try changing your search or filters"
                  : "Save explanations from the Ask page to see them here"}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default LibraryPage;
