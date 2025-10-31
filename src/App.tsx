import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Sidebar } from './components/Sidebar';
import { ChatView } from './components/ChatView';
import { VoiceRoomCard } from './components/VoiceRoomCard';
import { BotCard } from './components/BotCard';
import { MoodStatus } from './components/MoodStatus';
import { DualCameraMoment } from './components/DualCameraMoment';
import { Settings } from './components/Settings';
import { Button } from './components/ui/button';
import { ScrollArea } from './components/ui/scroll-area';
import { Camera, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

// Mock Data
const mockChats = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1592849902530-cbabb686381d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbnxlbnwxfHx8fDE3NjE3NzEzODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    lastMessage: 'See you at the meeting! 👋',
    timestamp: '2m',
    unread: 2,
    mood: '🔥',
    type: 'dm' as const,
    online: true
  },
  {
    id: '2',
    name: 'Design Team',
    avatar: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjE4NzIyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    lastMessage: 'New mockups are ready for review',
    timestamp: '15m',
    unread: 0,
    type: 'group' as const,
    online: false
  },
  {
    id: '3',
    name: 'LULI Announcements',
    avatar: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlcnNvbnxlbnwxfHx8fDE3NjE4MDUyNDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    lastMessage: 'New features: Disappearing messages & AI assistant!',
    timestamp: '1h',
    unread: 1,
    type: 'channel' as const,
    mood: '✨',
    online: false
  },
  {
    id: '4',
    name: 'Alex Morgan',
    avatar: 'https://images.unsplash.com/photo-1573867975080-15a3d9445345?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZGV2ZWxvcGVyfGVufDF8fHx8MTc2MTg3MjIxNXww&ixlib=rb-4.1.0&q=80&w=1080',
    lastMessage: 'Just shared a BeReal moment!',
    timestamp: '2h',
    unread: 0,
    mood: '📸',
    type: 'dm' as const,
    online: true
  }
];

// Different messages for each chat
const chatMessages: Record<string, Array<{
  id: string;
  text: string;
  timestamp: string;
  sent: boolean;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
  reactions?: Array<{ emoji: string; count: number; users: string[] }>;
  isDisappearing?: boolean;
  disappearTime?: string;
  image?: string;
}>> = {
  '1': [
    {
      id: '1-1',
      text: 'Hey! How are you doing?',
      timestamp: '10:30 AM',
      sent: false,
      status: 'read'
    },
    {
      id: '1-2',
      text: "I'm great! Just working on the new LULI features 🚀",
      timestamp: '10:32 AM',
      sent: true,
      status: 'read',
      reactions: [{ emoji: '🔥', count: 2, users: ['Sarah', 'Alex'] }]
    },
    {
      id: '1-3',
      text: 'The AI assistant is amazing! It really helps summarize long conversations.',
      timestamp: '10:35 AM',
      sent: false,
      status: 'read'
    },
    {
      id: '1-4',
      text: 'Glad you like it! Want to try the disappearing messages feature?',
      timestamp: '10:36 AM',
      sent: true,
      status: 'read',
      isDisappearing: true,
      disappearTime: '24h'
    }
  ],
  '2': [
    {
      id: '2-1',
      text: 'Hey team! I just uploaded the new design mockups to Figma',
      timestamp: '9:15 AM',
      sent: false,
      status: 'read'
    },
    {
      id: '2-2',
      text: 'Awesome! Let me check them out 👀',
      timestamp: '9:20 AM',
      sent: true,
      status: 'read'
    },
    {
      id: '2-3',
      text: 'The new color scheme looks fantastic! Love the neon accents.',
      timestamp: '9:25 AM',
      sent: false,
      status: 'read',
      reactions: [{ emoji: '❤️', count: 3, users: ['You', 'John', 'Emma'] }]
    },
    {
      id: '2-4',
      text: 'Thanks! Should we schedule a review meeting?',
      timestamp: '9:30 AM',
      sent: true,
      status: 'read'
    }
  ],
  '3': [
    {
      id: '3-1',
      text: '🎉 Luminous Loop v2.0 is here! New features include:',
      timestamp: 'Yesterday',
      sent: false,
      status: 'read'
    },
    {
      id: '3-2',
      text: '• AI-powered smart replies\n• Disappearing messages\n• Voice rooms with background blur\n• BeReal-style dual camera moments',
      timestamp: 'Yesterday',
      sent: false,
      status: 'read',
      reactions: [{ emoji: '🚀', count: 127, users: ['Everyone'] }]
    }
  ],
  '4': [
    {
      id: '4-1',
      text: 'Just posted my daily BeReal! Check it out 📸',
      timestamp: '2:30 PM',
      sent: false,
      status: 'read'
    },
    {
      id: '4-2',
      text: 'Haha nice! That dual camera feature is so cool',
      timestamp: '2:32 PM',
      sent: true,
      status: 'read'
    },
    {
      id: '4-3',
      text: 'Right? It really captures the moment from both perspectives',
      timestamp: '2:35 PM',
      sent: false,
      status: 'read'
    }
  ]
};

const mockVoiceRooms = [
  {
    title: 'Design Review Session',
    topic: 'Discussing new UI patterns and components',
    participants: [
      { id: '1', name: 'Sarah', avatar: 'https://images.unsplash.com/photo-1592849902530-cbabb686381d?w=100', isSpeaking: true, isMuted: false, role: 'host' as const },
      { id: '2', name: 'Alex', avatar: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100', isSpeaking: false, isMuted: false, role: 'speaker' as const },
      { id: '3', name: 'Chris', avatar: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?w=100', isSpeaking: false, isMuted: true, role: 'listener' as const },
      { id: '4', name: 'Jordan', avatar: 'https://images.unsplash.com/photo-1573867975080-15a3d9445345?w=100', isSpeaking: false, isMuted: false, role: 'listener' as const }
    ],
    maxParticipants: 20,
    isLocked: false
  },
  {
    title: 'Late Night Coding',
    topic: 'Building together, debugging together',
    participants: [
      { id: '5', name: 'Taylor', avatar: 'https://images.unsplash.com/photo-1592849902530-cbabb686381d?w=100', isSpeaking: false, isMuted: false, role: 'host' as const },
      { id: '6', name: 'Morgan', avatar: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100', isSpeaking: true, isMuted: false, role: 'speaker' as const }
    ],
    maxParticipants: 10,
    isLocked: false
  }
];

const mockBots = [
  {
    name: 'Weather Bot',
    description: 'Get instant weather updates and forecasts for any location',
    icon: 'https://images.unsplash.com/photo-1592849902530-cbabb686381d?w=100',
    category: 'Utility',
    rating: 4.8,
    downloads: '12.5K',
    isInstalled: false
  },
  {
    name: 'Poll Master',
    description: 'Create polls and surveys to gather opinions from your group',
    icon: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100',
    category: 'Productivity',
    rating: 4.9,
    downloads: '25K',
    isInstalled: true
  },
  {
    name: 'Music Sync',
    description: 'Share and listen to music together with your friends',
    icon: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?w=100',
    category: 'Entertainment',
    rating: 4.7,
    downloads: '18.3K',
    isInstalled: false
  },
  {
    name: 'Reminder Bot',
    description: 'Never forget important tasks and events with smart reminders',
    icon: 'https://images.unsplash.com/photo-1573867975080-15a3d9445345?w=100',
    category: 'Productivity',
    rating: 4.6,
    downloads: '10.2K',
    isInstalled: false
  }
];

const aiSuggestions = [
  "Thanks! That sounds great 👍",
  "Sure, I'd love to!",
  "Let me check my schedule",
  "Can we do it tomorrow instead?"
];

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [activeTab, setActiveTab] = useState('messages');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [showMoodStatus, setShowMoodStatus] = useState(false);
  const [showDualCamera, setShowDualCamera] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [messagesState, setMessagesState] = useState(chatMessages);

  const handleChatSelect = (chatId: string) => {
    setSelectedChat(chatId);
  };

  const handleBackToList = () => {
    setSelectedChat(null);
  };

  const handleSendMessage = (message: string) => {
    if (!selectedChat) return;

    const newMessage = {
      id: `${selectedChat}-${Date.now()}`,
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sent: true,
      status: 'sending' as const
    };

    setMessagesState(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage]
    }));

    // Simulate message delivery
    setTimeout(() => {
      setMessagesState(prev => ({
        ...prev,
        [selectedChat]: prev[selectedChat].map(msg =>
          msg.id === newMessage.id ? { ...msg, status: 'delivered' as const } : msg
        )
      }));
    }, 500);
  };

  const handleMoodSave = (emoji: string, text: string) => {
    toast.success(`Mood updated: ${emoji} ${text}`);
  };

  const handleDualCameraCapture = (frontImage: string, backImage: string) => {
    toast.success('BeReal moment shared!');
  };

  const handleBotInstall = (botName: string) => {
    toast.success(`${botName} installed successfully!`);
  };

  const handleCall = () => {
    toast.success('Starting voice call...');
  };

  const handleVideoCall = () => {
    toast.success('Starting video call...');
  };

  const handleNewChat = () => {
    toast.success('New chat feature - Connect with Supabase to enable');
  };

  const selectedChatData = selectedChat ? mockChats.find((chat) => chat.id === selectedChat) : null;
  const currentMessages = selectedChat ? messagesState[selectedChat] || [] : [];

  // Check if mobile view
  const isMobileView = true; // For this app, we're treating it as mobile-first

  return (
    <div className={theme}>
      <div className="flex h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden">
        {/* Sidebar - shown on desktop always, on mobile only when no chat selected */}
        <div className={`${selectedChat ? 'hidden md:flex' : 'flex'} w-full md:w-auto`}>
          <Sidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            chats={mockChats}
            onChatSelect={handleChatSelect}
            selectedChat={selectedChat || ''}
            theme={theme}
            onThemeToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            onNewChat={handleNewChat}
            onSettingsClick={() => setShowSettings(true)}
          />
        </div>

        {/* Main Content Area - shown on desktop always, on mobile only when chat selected */}
        <div className={`flex-1 ${!selectedChat ? 'hidden md:flex' : 'flex'} flex-col`}>
          {activeTab === 'messages' && selectedChatData && (
            <>
              <ChatView
                chatName={selectedChatData.name}
                chatAvatar={selectedChatData.avatar}
                chatStatus={selectedChatData.online ? 'Active now' : 'Last seen 2h ago'}
                messages={currentMessages}
                isTyping={false}
                onSendMessage={handleSendMessage}
                aiSuggestions={aiSuggestions}
                onBack={handleBackToList}
                onCall={handleCall}
                onVideoCall={handleVideoCall}
              />

              {/* Floating Action Buttons */}
              <div className="absolute bottom-24 right-4 md:right-8 flex flex-col gap-3 z-10">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    onClick={() => setShowDualCamera(true)}
                    size="lg"
                    className="rounded-full w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-2xl shadow-purple-500/30"
                  >
                    <Camera className="w-5 h-5 md:w-6 md:h-6" />
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    onClick={() => setShowMoodStatus(true)}
                    size="lg"
                    className="rounded-full w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700 text-white shadow-2xl shadow-orange-500/30"
                  >
                    <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
                  </Button>
                </motion.div>
              </div>
            </>
          )}

          {activeTab === 'messages' && !selectedChat && (
            <div className="hidden md:flex flex-1 bg-gradient-to-br from-white via-blue-50/20 to-cyan-50/30 dark:from-black dark:via-gray-950 dark:to-cyan-950/20 items-center justify-center">
              <div className="text-center">
                <motion.div
                  animate={{
                    boxShadow: theme === 'dark'
                      ? ['0 0 40px rgba(6, 182, 212, 0.3)', '0 0 80px rgba(6, 182, 212, 0.5)', '0 0 40px rgba(6, 182, 212, 0.3)']
                      : ['0 8px 30px rgba(6, 182, 212, 0.2)', '0 12px 40px rgba(6, 182, 212, 0.3)', '0 8px 30px rgba(6, 182, 212, 0.2)']
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-32 h-32 rounded-[2rem] bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-8 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                  <Sparkles className="w-16 h-16 text-white relative z-10" />
                </motion.div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent mb-3">
                  Welcome to LULI
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Select a chat to start messaging
                </p>
              </div>
            </div>
          )}

          {activeTab === 'rooms' && (
            <div className="flex-1 bg-gradient-to-br from-white via-purple-50/20 to-pink-50/30 dark:from-black dark:via-purple-950/20 dark:to-pink-950/10 p-4 md:p-8">
              <div className="max-w-6xl mx-auto">
                <div className="mb-6 md:mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent mb-2">Voice Rooms</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Join conversations, collaborate in real-time
                  </p>
                </div>

                <ScrollArea className="h-[calc(100vh-200px)]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {mockVoiceRooms.map((room, idx) => (
                      <VoiceRoomCard
                        key={idx}
                        {...room}
                        onJoin={() => toast.success(`Joined ${room.title}`)}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          )}

          {activeTab === 'bots' && (
            <div className="flex-1 bg-gradient-to-br from-white via-indigo-50/20 to-purple-50/30 dark:from-black dark:via-indigo-950/20 dark:to-purple-950/10 p-4 md:p-8">
              <div className="max-w-6xl mx-auto">
                <div className="mb-6 md:mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-2">Bot Marketplace</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Enhance your conversations with AI and utility bots
                  </p>
                </div>

                <ScrollArea className="h-[calc(100vh-200px)]">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {mockBots.map((bot, idx) => (
                      <BotCard
                        key={idx}
                        {...bot}
                        onInstall={() => handleBotInstall(bot.name)}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          )}

          {(activeTab === 'groups' || activeTab === 'channels') && (
            <div className="flex-1 bg-gradient-to-br from-white via-emerald-50/20 to-teal-50/30 dark:from-black dark:via-emerald-950/20 dark:to-teal-950/10 flex items-center justify-center p-4">
              <div className="text-center">
                <motion.div
                  animate={{
                    boxShadow: theme === 'dark'
                      ? ['0 0 40px rgba(6, 182, 212, 0.3)', '0 0 60px rgba(6, 182, 212, 0.5)', '0 0 40px rgba(6, 182, 212, 0.3)']
                      : ['0 8px 30px rgba(6, 182, 212, 0.2)', '0 12px 40px rgba(6, 182, 212, 0.3)', '0 8px 30px rgba(6, 182, 212, 0.2)']
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-24 h-24 md:w-28 md:h-28 rounded-[2rem] bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-8 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                  <Sparkles className="w-12 h-12 md:w-14 md:h-14 text-white relative z-10" />
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent mb-3">
                  {activeTab === 'groups' ? 'Groups' : 'Channels'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8 px-4">
                  {activeTab === 'groups'
                    ? 'Create or join groups to collaborate with teams'
                    : 'Subscribe to channels for updates and announcements'}
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={handleNewChat}
                    className="rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-xl"
                    style={
                      theme === 'dark'
                        ? { boxShadow: '0 0 30px rgba(6, 182, 212, 0.5), 0 8px 20px rgba(6, 182, 212, 0.3)' }
                        : { boxShadow: '0 8px 20px rgba(6, 182, 212, 0.3)' }
                    }
                  >
                    Create {activeTab === 'groups' ? 'Group' : 'Channel'}
                  </Button>
                </motion.div>
              </div>
            </div>
          )}
        </div>

        {/* Modals */}
        <AnimatePresence>
          {showMoodStatus && (
            <MoodStatus onClose={() => setShowMoodStatus(false)} onSave={handleMoodSave} />
          )}
          {showDualCamera && (
            <DualCameraMoment
              onClose={() => setShowDualCamera(false)}
              onCapture={handleDualCameraCapture}
            />
          )}
          {showSettings && (
            <Settings
              onClose={() => setShowSettings(false)}
              theme={theme}
              onThemeToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            />
          )}
        </AnimatePresence>

        <Toaster theme={theme} position="top-right" />
      </div>
    </div>
  );
}
