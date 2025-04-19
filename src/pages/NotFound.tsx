
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import GradientButton from '@/components/ui/GradientButton';
import { Brain } from 'lucide-react';

const NotFound = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 text-center py-12">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
          <Brain className="h-12 w-12 text-muted-foreground" />
        </div>
        
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-2xl font-medium mb-2">Page Not Found</p>
        <p className="text-foreground/70 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. Maybe our AI hasn't learned about it yet.
        </p>
        
        <Link to="/">
          <GradientButton>Return to Home</GradientButton>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
