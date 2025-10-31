import { motion } from 'motion/react';
import { Check, CheckCheck, Clock, Smile } from 'lucide-react';
import { useState } from 'react';

interface Reaction {
  emoji: string;
  count: number;
  users: string[];
}

interface ChatBubbleProps {
  message: string;
  timestamp: string;
  sent: boolean;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
  reactions?: Reaction[];
  isDisappearing?: boolean;
  disappearTime?: string;
  onReact?: (emoji: string) => void;
  image?: string;
}

export function ChatBubble({
  message,
  timestamp,
  sent,
  status = 'read',
  reactions = [],
  isDisappearing = false,
  disappearTime,
  onReact,
  image
}: ChatBubbleProps) {
  const [showReactions, setShowReactions] = useState(false);

  const quickReactions = ['❤️', '😂', '👍', '🔥', '🎉', '😮'];

  const getStatusIcon = () => {
    switch (status) {
      case 'sending':
        return <Clock className="w-3 h-3 opacity-60" />;
      case 'sent':
        return <Check className="w-3 h-3 opacity-60" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 opacity-60" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-cyan-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${sent ? 'justify-end' : 'justify-start'} mb-4 group`}
    >
      <div className={`relative max-w-[70%] ${sent ? 'items-end' : 'items-start'} flex flex-col`}>
        {/* LULI Beam Animation */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
          initial={false}
          animate={{
            background: sent
              ? 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.3), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.3), transparent)',
            backgroundPosition: ['0% 0%', '200% 0%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear'
          }}
        />

        <motion.div
          className={`relative rounded-3xl px-4 py-3 ${
            sent
              ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white dark:from-cyan-600 dark:to-blue-700'
              : 'bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-cyan-500/30 text-gray-900 dark:text-white'
          } ${isDisappearing ? 'ring-2 ring-purple-500/50' : ''}`}
          style={
            sent
              ? {
                  boxShadow: '0 4px 20px rgba(6, 182, 212, 0.4), 0 0 40px rgba(6, 182, 212, 0.2)'
                }
              : {
                  boxShadow: 'none'
                }
          }
          whileHover={{ scale: 1.02 }}
          onDoubleClick={() => setShowReactions(!showReactions)}
        >
          {image && (
            <img
              src={image}
              alt="Shared media"
              className="rounded-xl mb-2 max-w-full"
            />
          )}
          <p className="break-words">{message}</p>

          <div className={`flex items-center gap-2 mt-1 text-xs ${sent ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'}`}>
            <span>{timestamp}</span>
            {sent && getStatusIcon()}
            {isDisappearing && disappearTime && (
              <span className="text-purple-300">🔥 {disappearTime}</span>
            )}
          </div>
        </motion.div>

        {/* Reactions */}
        {reactions.length > 0 && (
          <div className="flex gap-1 mt-1 flex-wrap">
            {reactions.map((reaction, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-full px-2 py-0.5 text-xs flex items-center gap-1"
              >
                <span>{reaction.emoji}</span>
                <span className="text-gray-600 dark:text-gray-400">{reaction.count}</span>
              </motion.button>
            ))}
          </div>
        )}

        {/* Quick Reactions Panel */}
        {showReactions && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex gap-2 mt-2 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-full px-3 py-2"
          >
            {quickReactions.map((emoji) => (
              <motion.button
                key={emoji}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  onReact?.(emoji);
                  setShowReactions(false);
                }}
                className="text-xl hover:bg-white/10 rounded-full w-8 h-8 flex items-center justify-center"
              >
                {emoji}
              </motion.button>
            ))}
            <button
              onClick={() => setShowReactions(false)}
              className="text-gray-400 hover:text-white ml-1"
            >
              ×
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
