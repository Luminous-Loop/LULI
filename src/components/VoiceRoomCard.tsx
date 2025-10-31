import { motion } from 'motion/react';
import { Mic, MicOff, Volume2, Users, Lock, Crown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface Participant {
  id: string;
  name: string;
  avatar: string;
  isSpeaking: boolean;
  isMuted: boolean;
  role?: 'host' | 'speaker' | 'listener';
}

interface VoiceRoomCardProps {
  title: string;
  topic: string;
  participants: Participant[];
  maxParticipants: number;
  isLocked: boolean;
  onJoin: () => void;
}

export function VoiceRoomCard({
  title,
  topic,
  participants,
  maxParticipants,
  isLocked,
  onJoin
}: VoiceRoomCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-6 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-cyan-500/10 transition-all"
      onClick={onJoin}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-gray-900 dark:text-white">{title}</h3>
            {isLocked && <Lock className="w-4 h-4 text-gray-400" />}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{topic}</p>
        </div>
        <Badge className="bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-500/30">
          <Volume2 className="w-3 h-3 mr-1" />
          Live
        </Badge>
      </div>

      {/* Participants Grid */}
      <div className="grid grid-cols-6 gap-3 mb-4">
        {participants.slice(0, 12).map((participant) => (
          <div key={participant.id} className="relative">
            <motion.div
              animate={
                participant.isSpeaking
                  ? {
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        '0 0 0 0 rgba(6, 182, 212, 0)',
                        '0 0 0 8px rgba(6, 182, 212, 0.2)',
                        '0 0 0 0 rgba(6, 182, 212, 0)'
                      ]
                    }
                  : {}
              }
              transition={{ duration: 1, repeat: participant.isSpeaking ? Infinity : 0 }}
              className="relative"
            >
              <Avatar className="w-12 h-12 border-2 border-white/20">
                <AvatarImage src={participant.avatar} />
                <AvatarFallback>{participant.name[0]}</AvatarFallback>
              </Avatar>

              {/* Role Badge */}
              {participant.role === 'host' && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                  <Crown className="w-3 h-3 text-white" />
                </div>
              )}

              {/* Mute Status */}
              {participant.isMuted && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                  <MicOff className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </motion.div>
          </div>
        ))}

        {/* Show +X if more participants */}
        {participants.length > 12 && (
          <div className="w-12 h-12 rounded-full bg-white/10 dark:bg-white/5 border-2 border-white/20 flex items-center justify-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              +{participants.length - 12}
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Users className="w-4 h-4" />
          <span>
            {participants.length} / {maxParticipants}
          </span>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onJoin();
            }}
            size="sm"
            className="rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/30"
          >
            <Mic className="w-4 h-4 mr-2" />
            Join Room
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
