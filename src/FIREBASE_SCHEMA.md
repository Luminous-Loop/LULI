# Firebase/Supabase Database Schema for Luminous Loop (LULI)

## Collections/Tables Structure

### 1. Users Collection
```typescript
interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatar: string;
  phoneNumber?: string;
  
  // Status & Mood
  mood: {
    emoji: string;
    text: string;
    updatedAt: timestamp;
  };
  
  status: 'online' | 'away' | 'busy' | 'offline';
  lastSeen: timestamp;
  
  // Settings
  theme: 'light' | 'dark';
  notificationsEnabled: boolean;
  encryptionKeyPair: {
    publicKey: string;
    // privateKey stored locally, never on server
  };
  
  // BeReal
  dailyBeRealPosted: boolean;
  lastBeRealTime: timestamp;
  
  createdAt: timestamp;
  updatedAt: timestamp;
}
```

### 2. Chats Collection
```typescript
interface Chat {
  id: string;
  type: 'dm' | 'group' | 'channel';
  
  // Participants
  participantIds: string[];
  participants: {
    userId: string;
    role: 'admin' | 'moderator' | 'member';
    permissions: {
      canSendMessages: boolean;
      canAddMembers: boolean;
      canDeleteMessages: boolean;
    };
    joinedAt: timestamp;
  }[];
  
  // Metadata
  name: string;
  description?: string;
  avatar?: string;
  
  // Settings
  isEncrypted: boolean;
  disappearingMessages: {
    enabled: boolean;
    duration: number; // in seconds
  };
  
  // Channel specific
  isPublic?: boolean;
  subscriberCount?: number;
  
  lastMessage: {
    text: string;
    senderId: string;
    timestamp: timestamp;
  };
  
  createdBy: string;
  createdAt: timestamp;
  updatedAt: timestamp;
}
```

### 3. Messages Collection
```typescript
interface Message {
  id: string;
  chatId: string;
  senderId: string;
  
  // Content
  type: 'text' | 'image' | 'video' | 'audio' | 'file' | 'bereal';
  content: string;
  encryptedContent?: string; // for E2EE
  
  // Media
  media?: {
    url: string;
    thumbnailUrl?: string;
    fileName?: string;
    fileSize?: number;
    mimeType?: string;
    duration?: number; // for audio/video
  }[];
  
  // BeReal specific
  beRealData?: {
    frontCameraUrl: string;
    backCameraUrl: string;
    location?: {
      lat: number;
      lng: number;
    };
  };
  
  // Status
  status: 'sending' | 'sent' | 'delivered' | 'read';
  deliveredTo: string[]; // userIds
  readBy: string[]; // userIds
  
  // Reactions
  reactions: {
    emoji: string;
    userId: string;
    timestamp: timestamp;
  }[];
  
  // Thread/Reply
  replyTo?: string; // messageId
  threadMessages?: number; // count of thread replies
  
  // Disappearing
  isDisappearing: boolean;
  expiresAt?: timestamp;
  
  // AI features
  aiSummary?: string;
  translatedContent?: {
    language: string;
    text: string;
  }[];
  
  createdAt: timestamp;
  updatedAt: timestamp;
  deletedAt?: timestamp;
}
```

### 4. VoiceRooms Collection
```typescript
interface VoiceRoom {
  id: string;
  chatId?: string; // optional link to chat
  
  // Room details
  title: string;
  topic: string;
  isPublic: boolean;
  isLocked: boolean;
  password?: string;
  
  // Participants
  participants: {
    userId: string;
    role: 'host' | 'speaker' | 'listener';
    isMuted: boolean;
    isSpeaking: boolean;
    joinedAt: timestamp;
  }[];
  
  maxParticipants: number;
  
  // Settings
  allowVideoSharing: boolean;
  allowScreenSharing: boolean;
  backgroundBlurEnabled: boolean;
  
  // Status
  isActive: boolean;
  startedAt: timestamp;
  endedAt?: timestamp;
  
  createdBy: string;
  createdAt: timestamp;
}
```

### 5. Bots Collection
```typescript
interface Bot {
  id: string;
  name: string;
  description: string;
  
  // Metadata
  category: 'utility' | 'productivity' | 'entertainment' | 'ai' | 'games';
  icon: string;
  developer: {
    id: string;
    name: string;
  };
  
  // Stats
  rating: number;
  downloadCount: number;
  reviewCount: number;
  
  // Functionality
  commands: {
    name: string;
    description: string;
    usage: string;
  }[];
  
  webhookUrl?: string;
  apiKey?: string;
  
  // Permissions
  permissions: {
    readMessages: boolean;
    sendMessages: boolean;
    manageMembers: boolean;
    accessMedia: boolean;
  };
  
  isVerified: boolean;
  isActive: boolean;
  
  createdAt: timestamp;
  updatedAt: timestamp;
}
```

### 6. BotInstallations Collection
```typescript
interface BotInstallation {
  id: string;
  botId: string;
  chatId: string;
  installedBy: string;
  
  // Configuration
  config: Record<string, any>;
  isEnabled: boolean;
  
  installedAt: timestamp;
  updatedAt: timestamp;
}
```

### 7. Stories Collection
```typescript
interface Story {
  id: string;
  userId: string;
  
  type: 'image' | 'video' | 'bereal';
  mediaUrl: string;
  thumbnailUrl?: string;
  
  // BeReal specific
  beRealData?: {
    frontCameraUrl: string;
    backCameraUrl: string;
  };
  
  // Content
  caption?: string;
  
  // Visibility
  viewableBy: 'everyone' | 'contacts' | 'selected';
  selectedUserIds?: string[];
  
  // Engagement
  views: {
    userId: string;
    viewedAt: timestamp;
  }[];
  reactions: {
    userId: string;
    emoji: string;
    timestamp: timestamp;
  }[];
  
  // Expiration
  expiresAt: timestamp;
  
  createdAt: timestamp;
}
```

### 8. MediaVault Collection
```typescript
interface MediaVault {
  id: string;
  chatId: string;
  
  items: {
    messageId: string;
    type: 'image' | 'video' | 'audio' | 'file';
    url: string;
    thumbnailUrl?: string;
    fileName: string;
    fileSize: number;
    uploadedBy: string;
    uploadedAt: timestamp;
  }[];
  
  totalSize: number;
  createdAt: timestamp;
  updatedAt: timestamp;
}
```

### 9. Notifications Collection
```typescript
interface Notification {
  id: string;
  userId: string;
  
  type: 'message' | 'mention' | 'reaction' | 'room_invite' | 'bot_update';
  
  // Reference
  referenceId: string; // messageId, roomId, etc.
  referenceType: 'message' | 'room' | 'chat' | 'story';
  
  // Content
  title: string;
  body: string;
  icon?: string;
  
  // Sender
  fromUserId?: string;
  fromBotId?: string;
  
  // Status
  isRead: boolean;
  readAt?: timestamp;
  
  createdAt: timestamp;
}
```

## Storage Buckets

### 1. avatars/
- User profile pictures
- Group/channel icons
- Bot icons

### 2. media/
- Message attachments (images, videos, files)
- Voice messages
- BeReal captures

### 3. stories/
- Story media (24h retention)
- BeReal moments

## Security Rules (Firebase)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    
    // Chats collection
    match /chats/{chatId} {
      allow read: if request.auth != null && 
                     request.auth.uid in resource.data.participantIds;
      allow create: if request.auth != null;
      allow update: if request.auth != null && 
                       request.auth.uid in resource.data.participantIds;
    }
    
    // Messages collection
    match /messages/{messageId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth.uid == resource.data.senderId;
      allow delete: if request.auth.uid == resource.data.senderId;
    }
    
    // Voice Rooms
    match /voiceRooms/{roomId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
    }
  }
}
```

## Realtime Database Structure (for presence/typing indicators)

```
/presence/{userId}
  - status: online/offline
  - lastSeen: timestamp
  
/typing/{chatId}/{userId}
  - isTyping: boolean
  - timestamp: timestamp
```

## API Endpoints (Cloud Functions)

1. **AI Features**
   - `POST /ai/summarize` - Summarize chat history
   - `POST /ai/translate` - Translate message
   - `POST /ai/suggestions` - Get reply suggestions

2. **Bot Management**
   - `POST /bots/install` - Install bot to chat
   - `POST /bots/uninstall` - Remove bot from chat
   - `POST /bots/execute` - Execute bot command

3. **Media Processing**
   - `POST /media/upload` - Upload and process media
   - `POST /media/compress` - Compress large files
   - `GET /media/thumbnail` - Generate thumbnail

4. **Voice/Video**
   - `POST /rooms/create` - Create voice room
   - `POST /rooms/join` - Join voice room
   - `POST /rooms/leave` - Leave voice room

This schema is designed to be scalable and supports all the features of LULI including real-time messaging, end-to-end encryption, disappearing messages, voice rooms, bots, and BeReal-style moments.
