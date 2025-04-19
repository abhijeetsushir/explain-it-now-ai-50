
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 mt-12 border-t border-border">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="text-xl font-bold flex items-center gap-2">
              <span className="inline-block w-6 h-6 bg-gradient-candy rounded-md"></span>
              <span className="bg-gradient-to-r from-purple to-pink-dark bg-clip-text text-transparent">
                ExplainMe
              </span>
            </Link>
            <p className="mt-3 text-sm text-foreground/70">
              Learning made simple with AI-powered explanations, analogies, and code snippets.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-foreground/60 hover:text-foreground transition-colors" aria-label="Github">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-foreground transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/ask" className="text-foreground/70 hover:text-foreground transition-colors">Ask AI</Link>
              </li>
              <li>
                <Link to="/library" className="text-foreground/70 hover:text-foreground transition-colors">Your Library</Link>
              </li>
              <li>
                <Link to="/flashcards" className="text-foreground/70 hover:text-foreground transition-colors">Flashcards</Link>
              </li>
              <li>
                <Link to="/quiz" className="text-foreground/70 hover:text-foreground transition-colors">Quiz Mode</Link>
              </li>
              <li>
                <Link to="/collab" className="text-foreground/70 hover:text-foreground transition-colors">Collaborate</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">Help Center</a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-foreground/60">
          <p>© {new Date().getFullYear()} ExplainMe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
