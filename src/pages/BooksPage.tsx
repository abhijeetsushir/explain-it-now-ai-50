
import React from 'react';
import Layout from '@/components/layout/Layout';
import { BookOpen, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  resources: {
    title: string;
    url: string;
  }[];
  coverUrl: string;
}

const books: Book[] = [
  {
    id: '1',
    title: "Learning JavaScript",
    author: "Ethan Brown",
    description: "A comprehensive guide to modern JavaScript programming with practical examples.",
    category: "Programming",
    coverUrl: "/placeholder.svg",
    resources: [
      { title: "Free PDF Version", url: "https://eloquentjavascript.net/" },
      { title: "Interactive Tutorials", url: "https://javascript.info/" }
    ]
  },
  {
    id: '2',
    title: "Python Crash Course",
    author: "Eric Matthes",
    description: "A hands-on, project-based introduction to programming with Python.",
    category: "Programming",
    coverUrl: "/placeholder.svg",
    resources: [
      { title: "Official Resources", url: "https://ehmatthes.github.io/pcc/" },
      { title: "Practice Problems", url: "https://pythonbooks.org/free-books/" }
    ]
  },
  {
    id: '3',
    title: "Database Design",
    author: "Clare Churcher",
    description: "Learn database design principles and SQL fundamentals.",
    category: "Database",
    coverUrl: "/placeholder.svg",
    resources: [
      { title: "Online Tutorial", url: "https://www.postgresqltutorial.com/" },
      { title: "Practice Exercises", url: "https://sqlzoo.net/" }
    ]
  }
];

const BooksPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <BookOpen className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold">Recommended Books</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <Card key={book.id} className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {book.title}
                </CardTitle>
                <CardDescription>by {book.author}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">{book.description}</p>
                <div className="space-y-2">
                  {book.resources.map((resource, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-between"
                      asChild
                    >
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between"
                      >
                        {resource.title}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default BooksPage;
