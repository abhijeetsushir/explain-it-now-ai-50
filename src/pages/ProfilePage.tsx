
import React, { useState } from 'react';
import { Settings, User, BarChart3, Languages, Moon, Sun, Award } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from "@/hooks/use-toast";
import { Badge } from '@/components/ui/badge';

const ProfilePage = () => {
  const [isDark, setIsDark] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [language, setLanguage] = useState("english");
  const { toast } = useToast();
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    toast({
      title: isDark ? "Light mode activated" : "Dark mode activated",
      description: isDark ? "Your eyes will thank you during the day!" : "Easy on the eyes at night!",
    });
  };
  
  // Change language
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    toast({
      title: "Language updated",
      description: `Language set to ${value.charAt(0).toUpperCase() + value.slice(1)}`,
    });
  };
  
  // Mock badges data
  const badges = [
    { name: "Learning Streak", description: "7 days in a row", icon: <Award className="h-5 w-5" /> },
    { name: "Quiz Master", description: "5 perfect scores", icon: <Award className="h-5 w-5" /> },
    { name: "Knowledge Hoarder", description: "Saved 20+ explanations", icon: <Award className="h-5 w-5" /> },
    { name: "Quick Learner", description: "Completed 10 flashcard decks", icon: <Award className="h-5 w-5" /> },
  ];
  
  // Mock stats data
  const stats = [
    { label: "Questions Asked", value: 42 },
    { label: "Topics Mastered", value: 12 },
    { label: "Flashcards Reviewed", value: 158 },
    { label: "Quiz Points", value: 750 },
  ];
  
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Your Profile</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-3 mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Stats</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* User Info */}
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>User Profile</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-candy flex items-center justify-center text-white text-3xl font-bold mb-6">
                    ME
                  </div>
                  <h2 className="text-xl font-bold mb-1">ExplainMe User</h2>
                  <p className="text-foreground/70 mb-4">user@example.com</p>
                  <Button variant="outline" size="sm">Edit Profile</Button>
                </CardContent>
              </Card>
              
              {/* Badges */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Your Badges</CardTitle>
                  <CardDescription>Achievements you've earned</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {badges.map((badge, index) => (
                      <div 
                        key={index}
                        className="flex items-center p-4 glass-card card-hover"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                          {badge.icon}
                        </div>
                        <div>
                          <h3 className="font-medium">{badge.name}</h3>
                          <p className="text-sm text-foreground/70">{badge.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Stats Tab */}
          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle>Learning Statistics</CardTitle>
                <CardDescription>Your progress on ExplainMe</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="glass-card p-4 text-center">
                      <h3 className="text-3xl font-bold text-primary mb-1">{stat.value}</h3>
                      <p className="text-sm text-foreground/70">{stat.label}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <h3 className="font-semibold mb-4">Top Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge>React</Badge>
                    <Badge>JavaScript</Badge>
                    <Badge>Machine Learning</Badge>
                    <Badge>Python</Badge>
                    <Badge>Data Structures</Badge>
                    <Badge>Algorithms</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Application Settings</CardTitle>
                <CardDescription>Customize your experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Theme Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    <div>
                      <p className="font-medium">Theme</p>
                      <p className="text-sm text-foreground/70">
                        Switch between light and dark mode
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm mr-2">{isDark ? 'Dark' : 'Light'}</span>
                    <Switch
                      checked={isDark}
                      onCheckedChange={toggleDarkMode}
                    />
                  </div>
                </div>
                
                {/* Language Selection */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Languages className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Language</p>
                      <p className="text-sm text-foreground/70">
                        Choose your preferred language
                      </p>
                    </div>
                  </div>
                  <div>
                    <Select value={language} onValueChange={handleLanguageChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                        <SelectItem value="chinese">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Notifications */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-foreground/70">
                      Receive emails about your activity
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                {/* Reset Button */}
                <div className="pt-4 border-t border-border">
                  <Button variant="destructive">Reset All Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ProfilePage;
