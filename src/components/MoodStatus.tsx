import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';

interface MoodStatusProps {
  onClose: () => void;
  onSave: (emoji: string, text: string) => void;
}

const moodEmojis = [
  '😊', '😎', '🔥', '💪', '🎉', '😴',
  '🤔', '😢', '❤️', '🚀', '☕', '🎮',
  '📚', '🏃', '🎵', '💼', '🌟', '✨'
];

export function MoodStatus({ onClose, onSave }: MoodStatusProps) {
  const [selectedEmoji, setSelectedEmoji] = useState('😊');
  const [statusText, setStatusText] = useState('');

  const handleSave = () => {
    onSave(selectedEmoji, statusText);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-gray-200 dark:border-white/10"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-gray-900 dark:text-white">Set Your Mood</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-xl">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400 mb-3 block">
              Choose an emoji
            </label>
            <div className="grid grid-cols-6 gap-2">
              {moodEmojis.map((emoji) => (
                <motion.button
                  key={emoji}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`text-3xl p-3 rounded-2xl transition-all ${
                    selectedEmoji === emoji
                      ? 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30'
                      : 'hover:bg-gray-100 dark:hover:bg-white/5'
                  }`}
                >
                  {emoji}
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">
              Status message (optional)
            </label>
            <Input
              value={statusText}
              onChange={(e) => setStatusText(e.target.value)}
              placeholder="What's on your mind?"
              maxLength={50}
              className="rounded-2xl bg-gray-100 dark:bg-white/5 border-none"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {statusText.length}/50 characters
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleSave}
              className="w-full rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/30"
            >
              Save Mood
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
