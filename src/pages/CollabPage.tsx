
import React, { useState } from 'react';
import { Users, Send, Copy, ArrowRightCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import GradientButton from '@/components/ui/GradientButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from "@/hooks/use-toast";

// Mock participants
const participants = [
  { id: 1, name: "You", avatar: null, isYou: true },
  { id: 2, name: "Alex", avatar: null, isYou: false },
  { id: 3, name: "Jamie", avatar: null, isYou: false },
];

// Mock room chat/notes
const initialNotes = [
  { id: 1, author: "Alex", text: "I'm confused about React hooks. Can someone explain them?", timestamp: "3:42 PM" },
  { id: 2, author: "Jamie", text: "Sure! Hooks are functions that let you use React features in functional components instead of classes.", timestamp: "3:44 PM" },
];

const CollabPage = () => {
  const [roomCode, setRoomCode] = useState("");
  const [inRoom, setInRoom] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState(initialNotes);
  const [currentTopic, setCurrentTopic] = useState("React Hooks");
  const { toast } = useToast();
  
  const joinRoom = () => {
    if (!roomCode.trim()) {
      toast({
        title: "Room code required",
        description: "Please enter a room code to join",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate joining a room
    toast({
      title: "Room joined",
      description: `You've joined the study room: ${roomCode}`,
    });
    setInRoom(true);
  };
  
  const createRoom = () => {
    // Generate a random 6-character code
    const generatedCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomCode(generatedCode);
    
    toast({
      title: "Room created",
      description: `Room code: ${generatedCode}`,
    });
    setInRoom(true);
  };
  
  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    toast({
      title: "Copied to clipboard",
      description: "Room code copied. Share it with your friends!",
    });
  };
  
  const addNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    
    const newNote = {
      id: Date.now(),
      author: "You",
      text: noteText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setNotes([...notes, newNote]);
    setNoteText("");
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4">
        {!inRoom ? (
          // Join or create room view
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-purple flex items-center justify-center">
              <Users className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Study Together</h1>
            <p className="text-foreground/70 mb-8">
              Join a collaborative study room or create your own to learn with friends.
            </p>
            
            <div className="glass-card p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Join Existing Room</h2>
              <div className="flex gap-2">
                <Input
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  placeholder="Enter room code"
                  className="text-center uppercase"
                  maxLength={6}
                />
                <Button onClick={joinRoom}>
                  Join
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <p className="mb-4 text-sm text-foreground/70">Don't have a room code?</p>
              <GradientButton variant="secondary" onClick={createRoom}>
                Create New Room
              </GradientButton>
            </div>
          </div>
        ) : (
          // Inside room view
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Study Room</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={copyRoomCode}
                      className="flex items-center gap-1"
                    >
                      {roomCode}
                      <Copy className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                  <CardDescription>Currently studying: {currentTopic}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Participants</h3>
                      <div className="space-y-2">
                        {participants.map((participant) => (
                          <div key={participant.id} className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={participant.avatar || undefined} />
                              <AvatarFallback className={participant.isYou ? "bg-gradient-candy" : ""}>
                                {participant.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">
                              {participant.name} {participant.isYou && "(You)"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Options</h3>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        Change Topic
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main content */}
            <div className="lg:col-span-9">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Shared Learning Space</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/30 rounded-lg p-6 min-h-[300px]">
                    <h3 className="text-xl font-semibold mb-4">{currentTopic}</h3>
                    <p className="text-foreground/70 mb-4">
                      React hooks are functions that let you use React features in functional components.
                      They were introduced in React 16.8 as a way to use state and other React features
                      without writing a class component.
                    </p>
                    <p className="text-foreground/70">
                      The most common hooks include:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 mt-2">
                      <li><span className="font-medium">useState</span> - For managing state in functional components</li>
                      <li><span className="font-medium">useEffect</span> - For handling side effects (data fetching, subscriptions, etc.)</li>
                      <li><span className="font-medium">useContext</span> - For accessing context values</li>
                      <li><span className="font-medium">useRef</span> - For creating mutable references that persist across re-renders</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              {/* Discussion area */}
              <Card>
                <CardHeader>
                  <CardTitle>Group Discussion</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Notes/Chat */}
                  <div className="h-[300px] overflow-y-auto mb-4 space-y-4">
                    {notes.map((note) => (
                      <div key={note.id} className={`flex ${note.author === "You" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg ${
                          note.author === "You" 
                            ? "bg-primary text-white" 
                            : "bg-muted"
                        }`}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-sm">{note.author}</span>
                            <span className="text-xs opacity-70">{note.timestamp}</span>
                          </div>
                          <p>{note.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Input field */}
                  <form onSubmit={addNote} className="flex gap-2">
                    <Input
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Add a note or question..."
                      className="flex-grow"
                    />
                    <Button type="submit">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CollabPage;
