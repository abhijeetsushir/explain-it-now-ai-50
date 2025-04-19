
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { toast } = useToast();
  
  // Check for dark mode preference
  useEffect(() => {
    const isDarkMode = localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      toast({
        title: "Light mode activated",
        description: "Your eyes will thank you during the day!",
      });
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      toast({
        title: "Dark mode activated",
        description: "Easy on the eyes at night!",
      });
    }
  };
  
  const navLinks = [
    { name: 'Ask', path: '/ask' },
    { name: 'Library', path: '/library' },
    { name: 'Flashcards', path: '/flashcards' },
    { name: 'Quiz', path: '/quiz' },
    { name: 'Collab', path: '/collab' },
  ];
  
  return (
    <nav className="py-5 fixed w-full top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <span className="inline-block w-8 h-8 bg-gradient-candy rounded-lg"></span>
          <span className="bg-gradient-to-r from-purple to-pink-dark bg-clip-text text-transparent">
            ExplainMe
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className="text-foreground/80 hover:text-foreground font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
        
        <div className="hidden md:flex items-center">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-muted transition-colors mr-4"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          
          <Link 
            to="/profile"
            className="w-9 h-9 rounded-full bg-gradient-candy flex items-center justify-center text-white font-medium"
          >
            ME
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-background shadow-lg border-b border-border animate-slide-up">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-foreground/80 hover:text-foreground font-medium py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark ? (
                  <div className="flex items-center">
                    <Sun className="h-5 w-5 mr-2" />
                    <span>Light Mode</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Moon className="h-5 w-5 mr-2" />
                    <span>Dark Mode</span>
                  </div>
                )}
              </button>
              
              <Link
                to="/profile"
                className="flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Profile</span>
                <div className="w-8 h-8 rounded-full bg-gradient-candy flex items-center justify-center text-white font-medium">
                  ME
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
