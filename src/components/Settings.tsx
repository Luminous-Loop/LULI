import { motion, AnimatePresence } from 'motion/react';
import { X, User, Bell, Lock, Palette, Database, Zap, Shield, Globe, Moon, Sun, Volume2 } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';

interface SettingsProps {
  onClose: () => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

export function Settings({ onClose, theme, onThemeToggle }: SettingsProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl bg-white dark:bg-gray-950 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-cyan-500/20"
          style={{
            boxShadow: theme === 'dark' 
              ? '0 0 80px rgba(6, 182, 212, 0.3), 0 20px 60px rgba(0, 0, 0, 0.5)'
              : '0 20px 60px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-br from-cyan-500 to-blue-600 p-6">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
            <div className="relative flex items-center justify-between">
              <div>
                <h2 className="text-2xl text-white mb-1">Settings</h2>
                <p className="text-white/80 text-sm">Customize your LULI experience</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <ScrollArea className="h-[500px]">
            <div className="p-6 space-y-6">
              {/* Profile Section */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-cyan-500/30">
                      <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200" />
                      <AvatarFallback>ME</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-4 border-white dark:border-gray-950" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg text-gray-900 dark:text-white">Alex Morgan</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">@alexm</p>
                    <Button variant="link" className="px-0 h-auto text-cyan-500 hover:text-cyan-600">
                      Edit Profile
                    </Button>
                  </div>
                </div>
              </div>

              <Separator className="bg-gray-200 dark:bg-white/10" />

              {/* Appearance */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <Palette className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-gray-900 dark:text-white">Appearance</h3>
                </div>
                <div className="space-y-3 pl-13">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-white/5">
                    <div className="flex items-center gap-3">
                      {theme === 'dark' ? <Moon className="w-4 h-4 text-gray-600 dark:text-gray-400" /> : <Sun className="w-4 h-4 text-gray-600 dark:text-gray-400" />}
                      <span className="text-sm text-gray-900 dark:text-white">Dark Mode</span>
                    </div>
                    <Switch checked={theme === 'dark'} onCheckedChange={onThemeToggle} />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-white/5">
                    <span className="text-sm text-gray-900 dark:text-white">Neon Glow Effects</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-white/5">
                    <span className="text-sm text-gray-900 dark:text-white">Animations</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator className="bg-gray-200 dark:bg-white/10" />

              {/* Notifications */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-600 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-gray-900 dark:text-white">Notifications</h3>
                </div>
                <div className="space-y-3 pl-13">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-white/5">
                    <span className="text-sm text-gray-900 dark:text-white">Message Notifications</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-white/5">
                    <span className="text-sm text-gray-900 dark:text-white">Voice Room Alerts</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-white/5">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm text-gray-900 dark:text-white">Notification Sounds</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator className="bg-gray-200 dark:bg-white/10" />

              {/* Privacy & Security */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-gray-900 dark:text-white">Privacy & Security</h3>
                </div>
                <div className="space-y-3 pl-13">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-white/5">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm text-gray-900 dark:text-white">End-to-End Encryption</span>
                    </div>
                    <Switch defaultChecked disabled />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-white/5">
                    <span className="text-sm text-gray-900 dark:text-white">Read Receipts</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-white/5">
                    <span className="text-sm text-gray-900 dark:text-white">Last Seen Status</span>
                    <Switch defaultChecked />
                  </div>
                  <Button variant="outline" className="w-full rounded-xl border-gray-300 dark:border-white/20">
                    Blocked Users
                  </Button>
                </div>
              </div>

              <Separator className="bg-gray-200 dark:bg-white/10" />

              {/* AI & Smart Features */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-gray-900 dark:text-white">AI Assistant</h3>
                </div>
                <div className="space-y-3 pl-13">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-white/5">
                    <span className="text-sm text-gray-900 dark:text-white">Smart Replies</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-white/5">
                    <span className="text-sm text-gray-900 dark:text-white">Message Summarization</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-white/5">
                    <span className="text-sm text-gray-900 dark:text-white">Auto-Translate</span>
                    <Switch />
                  </div>
                </div>
              </div>

              <Separator className="bg-gray-200 dark:bg-white/10" />

              {/* Storage */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <Database className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-gray-900 dark:text-white">Storage & Data</h3>
                </div>
                <div className="space-y-3 pl-13">
                  <div className="p-3 rounded-2xl bg-gray-50 dark:bg-white/5">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-900 dark:text-white">Media Vault</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">2.4 GB / 5 GB</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-[48%] bg-gradient-to-r from-cyan-500 to-blue-600" />
                    </div>
                  </div>
                  <Button variant="outline" className="w-full rounded-xl border-gray-300 dark:border-white/20">
                    Manage Storage
                  </Button>
                </div>
              </div>

              <Separator className="bg-gray-200 dark:bg-white/10" />

              {/* About */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-gray-900 dark:text-white">About</h3>
                </div>
                <div className="space-y-2 pl-13 text-sm text-gray-600 dark:text-gray-400">
                  <p>Luminous Loop v2.0.1</p>
                  <p>© 2025 LULI Technologies</p>
                  <div className="flex gap-4 mt-3">
                    <Button variant="link" className="px-0 h-auto text-cyan-500 hover:text-cyan-600 text-sm">
                      Privacy Policy
                    </Button>
                    <Button variant="link" className="px-0 h-auto text-cyan-500 hover:text-cyan-600 text-sm">
                      Terms of Service
                    </Button>
                    <Button variant="link" className="px-0 h-auto text-cyan-500 hover:text-cyan-600 text-sm">
                      Help Center
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
