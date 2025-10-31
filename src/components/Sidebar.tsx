import { motion } from 'motion/react';
import {
  MessageCircle,
  Users,
  Radio,
  Bot,
  Settings,
  Bell,
  Search,
  Plus,
  Hash
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  mood?: string;
  type: 'dm' | 'group' | 'channel';
  online?: boolean;
}

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  chats: Chat[];
  onChatSelect: (chatId: string) => void;
  selectedChat: string;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  onNewChat: () => void;
  onSettingsClick: () => void;
}

export function Sidebar({
  activeTab,
  onTabChange,
  chats,
  onChatSelect,
  selectedChat,
  theme,
  onThemeToggle,
  onNewChat,
  onSettingsClick
}: SidebarProps) {
  const tabs = [
    { id: 'messages', icon: MessageCircle, label: 'Chats' },
    { id: 'groups', icon: Users, label: 'Groups' },
    { id: 'channels', icon: Hash, label: 'Channels' },
    { id: 'rooms', icon: Radio, label: 'Rooms' },
    { id: 'bots', icon: Bot, label: 'Bots' }
  ];

  return (
    <div className="flex flex-col h-screen w-full md:w-[400px] bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-black dark:to-cyan-950/20">
      {/* Header with Logo */}
      <div className="relative p-4 md:p-6">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 dark:from-cyan-500/5 dark:to-blue-600/5" />
        <div className="relative flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 flex items-center justify-center cursor-pointer"
              style={{
                boxShadow: theme === 'dark'
                  ? '0 0 30px rgba(6, 182, 212, 0.6), 0 0 60px rgba(6, 182, 212, 0.3)'
                  : '0 4px 20px rgba(6, 182, 212, 0.4)'
              }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
              <span className="relative text-white font-bold text-xl">L</span>
            </motion.div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                LULI
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">Luminous Loop</p>
            </div>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
            >
              <Bell className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSettingsClick}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
            >
              <Settings className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search conversations..."
            className="pl-10 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-cyan-500 dark:focus:border-cyan-500 transition-all"
            style={{
              boxShadow: 'none'
            }}
          />
        </div>
      </div>

      {/* Tab Navigation - Horizontal Pills */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
              }`}
              style={
                activeTab === tab.id && theme === 'dark'
                  ? {
                      boxShadow: '0 0 20px rgba(6, 182, 212, 0.5), 0 4px 12px rgba(6, 182, 212, 0.3)'
                    }
                  : {}
              }
            >
              <tab.icon className="w-4 h-4" />
              <span className="text-sm">{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-2 pb-4">
          {chats.map((chat) => (
            <motion.button
              key={chat.id}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChatSelect(chat.id)}
              className={`w-full p-4 rounded-2xl flex items-center gap-3 transition-all ${
                selectedChat === chat.id
                  ? 'bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 border-2 border-cyan-500/50'
                  : 'bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 border-2 border-transparent'
              }`}
              style={
                selectedChat === chat.id && theme === 'dark'
                  ? {
                      boxShadow: '0 0 25px rgba(6, 182, 212, 0.3), inset 0 0 20px rgba(6, 182, 212, 0.1)'
                    }
                  : {}
              }
            >
              <div className="relative">
                <Avatar className="w-12 h-12 border-2 border-white dark:border-gray-900">
                  <AvatarImage src={chat.avatar} />
                  <AvatarFallback>{chat.name[0]}</AvatarFallback>
                </Avatar>
                {chat.online && (
                  <div 
                    className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-green-500 border-2 border-white dark:border-gray-950"
                    style={
                      theme === 'dark'
                        ? { boxShadow: '0 0 10px rgba(34, 197, 94, 0.8)' }
                        : {}
                    }
                  />
                )}
                {chat.mood && (
                  <div className="absolute -top-1 -right-1 text-xs">{chat.mood}</div>
                )}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {chat.name}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0">
                    {chat.timestamp}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {chat.lastMessage}
                  </p>
                  {chat.unread > 0 && (
                    <Badge
                      className="ml-2 flex-shrink-0 bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0 rounded-full px-2 min-w-[20px] h-5 flex items-center justify-center"
                      style={
                        theme === 'dark'
                          ? { boxShadow: '0 0 15px rgba(6, 182, 212, 0.6)' }
                          : {}
                      }
                    >
                      {chat.unread}
                    </Badge>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </ScrollArea>

      {/* Floating New Chat Button */}
      <div className="p-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNewChat}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center justify-center gap-2 font-medium"
          style={
            theme === 'dark'
              ? {
                  boxShadow: '0 0 30px rgba(6, 182, 212, 0.5), 0 8px 16px rgba(6, 182, 212, 0.3)'
                }
              : {
                  boxShadow: '0 8px 16px rgba(6, 182, 212, 0.3)'
                }
          }
        >
          <Plus className="w-5 h-5" />
          <span>New Chat</span>
        </motion.button>
      </div>
    </div>
  );
}
