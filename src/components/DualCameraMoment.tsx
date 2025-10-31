import { motion, AnimatePresence } from 'motion/react';
import { Camera, X, Send, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

interface DualCameraMomentProps {
  onClose: () => void;
  onCapture: (frontImage: string, backImage: string) => void;
}

export function DualCameraMoment({ onClose, onCapture }: DualCameraMomentProps) {
  const [captured, setCaptured] = useState(false);
  const [frontImage, setFrontImage] = useState('');
  const [backImage, setBackImage] = useState('');

  const handleCapture = () => {
    // Simulate camera capture
    setFrontImage('https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop');
    setBackImage('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop');
    setCaptured(true);
  };

  const handleRetake = () => {
    setCaptured(false);
    setFrontImage('');
    setBackImage('');
  };

  const handleSend = () => {
    onCapture(frontImage, backImage);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
    >
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="rounded-full bg-white/10 backdrop-blur-xl text-white hover:bg-white/20"
        >
          <X className="w-6 h-6" />
        </Button>
      </div>

      {!captured ? (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center mb-8"
          >
            <h2 className="text-white text-3xl mb-2">Time to BeReal.</h2>
            <p className="text-gray-300">Capture both views at once</p>
          </motion.div>

          {/* Camera Preview Mockup */}
          <div className="relative max-w-sm w-full aspect-[9/16] bg-gray-800 rounded-3xl overflow-hidden border-4 border-white/20 mb-8">
            {/* Back Camera View */}
            <div className="w-full h-full bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
              <Camera className="w-20 h-20 text-white/30" />
            </div>

            {/* Front Camera View (Picture-in-Picture) */}
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-4 left-4 w-32 h-40 bg-gradient-to-br from-cyan-900 to-purple-900 rounded-2xl border-4 border-white/30 flex items-center justify-center"
            >
              <Camera className="w-10 h-10 text-white/30" />
            </motion.div>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleCapture}
              size="lg"
              className="rounded-full w-20 h-20 bg-white text-black hover:bg-gray-200 shadow-2xl shadow-white/20"
            >
              <Camera className="w-8 h-8" />
            </Button>
          </motion.div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
          {/* Captured Images Preview */}
          <div className="relative max-w-sm w-full aspect-[9/16] rounded-3xl overflow-hidden border-4 border-white/20 mb-8">
            {/* Back Camera Image */}
            <img
              src={backImage}
              alt="Back camera"
              className="w-full h-full object-cover"
            />

            {/* Front Camera Image (Picture-in-Picture) */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 0.6 }}
              className="absolute top-4 left-4 w-32 h-40 rounded-2xl border-4 border-white overflow-hidden shadow-2xl"
            >
              <img
                src={frontImage}
                alt="Front camera"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* LULI Beam Effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
            </motion.div>
          </div>

          <div className="flex gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleRetake}
                size="lg"
                variant="outline"
                className="rounded-full px-8 bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Retake
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleSend}
                size="lg"
                className="rounded-full px-8 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
              >
                <Send className="w-5 h-5 mr-2" />
                Share
              </Button>
            </motion.div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
