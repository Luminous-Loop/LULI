import { motion, AnimatePresence } from 'motion/react';
import {
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Send,
  Mic,
  Image as ImageIcon,
  Sparkles,
  Lock,
  Timer,
  ArrowLeft
} from 'lucide-react';
import { useState } from 'react';
import { ChatBubble } from './ChatBubble';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  sent: boolean;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
  reactions?: Array<{ emoji: string; count: number; users: string[] }>;
  isDisappearing?: boolean;
  disappearTime?: string;
  image?: string;
}

interface ChatViewProps {
  chatName: string;
  chatAvatar: string;
  chatStatus: string;
  messages: Message[];
  isTyping?: boolean;
  onSendMessage: (message: string) => void;
  aiSuggestions?: string[];
  onBack?: () => void;
  onCall?: () => void;
  onVideoCall?: () => void;
}

export function ChatView({
  chatName,
  chatAvatar,
  chatStatus,
  messages,
  isTyping = false,
  onSendMessage,
  aiSuggestions = [],
  onBack,
  onCall,
  onVideoCall
}: ChatViewProps) {
  const [messageText, setMessageText] = useState('');
  const [showAI, setShowAI] = useState(false);
  const [disappearingMode, setDisappearingMode] = useState(false);

  const handleSend = () => {
    if (messageText.trim()) {
      onSendMessage(messageText);
      setMessageText('');
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-gradient-to-br from-white via-blue-50/20 to-cyan-50/30 dark:from-black dark:via-gray-950 dark:to-cyan-950/20">
      {/* Header */}
      <div className="relative bg-white/90 dark:bg-gray-950/90 backdrop-blur-2xl border-b-2 border-gray-200 dark:border-cyan-500/20 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent" />
        <div className="relative flex items-center gap-3 md:gap-4">
          {onBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="md:hidden rounded-xl text-gray-600 dark:text-gray-400 hover:bg-cyan-500/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <Avatar className="w-10 h-10 md:w-12 md:h-12 border-2 border-cyan-500/30 ring-2 ring-cyan-500/10">
            <AvatarImage src={chatAvatar} />
            <AvatarFallback>{chatName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{chatName}</h3>
            <p className="text-xs text-cyan-600 dark:text-cyan-400">{chatStatus}</p>
          </div>
        </div>

        <div className="relative flex items-center gap-1 md:gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onCall}
            className="rounded-xl text-gray-600 dark:text-gray-400 hover:bg-cyan-500/10 hover:text-cyan-500 transition-all"
          >
            <Phone className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onVideoCall}
            className="rounded-xl text-gray-600 dark:text-gray-400 hover:bg-cyan-500/10 hover:text-cyan-500 transition-all"
          >
            <Video className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowAI(!showAI)}
            className={`rounded-xl transition-all ${
              showAI
                ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/40'
                : 'text-gray-600 dark:text-gray-400 hover:bg-cyan-500/10 hover:text-cyan-500'
            }`}
          >
            <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl text-gray-600 dark:text-gray-400"
              >
                <MoreVertical className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => setDisappearingMode(!disappearingMode)}>
                <Timer className="w-4 h-4 mr-2" />
                {disappearingMode ? 'Disable' : 'Enable'} Disappearing Messages
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Lock className="w-4 h-4 mr-2" />
                View Encryption Info
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ImageIcon className="w-4 h-4 mr-2" />
                Open Media Vault
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* AI Assistant Panel */}
      <AnimatePresence>
        {showAI && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border-b border-cyan-500/20 overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-cyan-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  AI Smart Assistant
                </span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {aiSuggestions.map((suggestion, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setMessageText(suggestion)}
                    className="px-3 py-1.5 bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-cyan-500/30 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-cyan-500/20"
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages Area */}
      <ScrollArea className="flex-1 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message.text}
              timestamp={message.timestamp}
              sent={message.sent}
              status={message.status}
              reactions={message.reactions}
              isDisappearing={message.isDisappearing || disappearingMode}
              disappearTime={message.disappearTime}
              image={message.image}
            />
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {chatName} is typing...
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-t border-gray-200 dark:border-white/10 p-3 md:p-4">
        <div className="max-w-4xl mx-auto">
          {disappearingMode && (
            <div className="mb-2 flex items-center gap-2 text-xs md:text-sm text-purple-600 dark:text-purple-400">
              <Timer className="w-3 h-3 md:w-4 md:h-4" />
              <span>Disappearing messages enabled (24h)</span>
            </div>
          )}
          <div className="flex items-center gap-2 md:gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex rounded-xl text-gray-600 dark:text-gray-400 hover:text-cyan-500"
            >
              <Paperclip className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex rounded-xl text-gray-600 dark:text-gray-400 hover:text-cyan-500"
            >
              <ImageIcon className="w-5 h-5" />
            </Button>

            <div className="flex-1 relative">
              <Input
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="pr-12 rounded-2xl bg-gray-100 dark:bg-white/5 border-none"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-xl text-gray-600 dark:text-gray-400 hover:text-cyan-500"
              >
                <Smile className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </div>

            {messageText.trim() ? (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleSend}
                  size="icon"
                  className="rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/30"
                >
                  <Send className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </motion.div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl text-gray-600 dark:text-gray-400 hover:text-cyan-500"
              >
                <Mic className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
