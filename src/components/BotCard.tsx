import { motion } from 'motion/react';
import { Bot, Plus, Star, Download } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface BotCardProps {
  name: string;
  description: string;
  icon: string;
  category: string;
  rating: number;
  downloads: string;
  isInstalled: boolean;
  onInstall: () => void;
}

export function BotCard({
  name,
  description,
  icon,
  category,
  rating,
  downloads,
  isInstalled,
  onInstall
}: BotCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-lg hover:shadow-2xl hover:shadow-purple-500/10 transition-all"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <Avatar className="w-14 h-14 border-2 border-purple-500/30">
            <AvatarImage src={icon} />
            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500">
              <Bot className="w-6 h-6 text-white" />
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Bot className="w-3 h-3 text-white" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-gray-900 dark:text-white mb-1">{name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <Badge variant="outline" className="border-purple-500/30 text-purple-600 dark:text-purple-400">
          {category}
        </Badge>
        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
          <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
          <span>{rating}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
          <Download className="w-3 h-3" />
          <span>{downloads}</span>
        </div>
      </div>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          onClick={onInstall}
          disabled={isInstalled}
          className={`w-full rounded-xl ${
            isInstalled
              ? 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              : 'bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg shadow-purple-500/30'
          }`}
        >
          {isInstalled ? (
            <>
              <Bot className="w-4 h-4 mr-2" />
              Installed
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Add Bot
            </>
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
}
