# MyChatbotApp - Complete Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Setup & Installation](#setup--installation)
6. [Features](#features)
7. [Development Guide](#development-guide)
8. [Backend API](#backend-api)
9. [Deployment](#deployment)
10. [Troubleshooting](#troubleshooting)

---

## Project Overview

**MyChatbotApp** is a React Native mobile application built with Expo that provides an intelligent chatbot interface powered by Google's Generative AI (Gemini API). The app supports text conversations, image analysis, and document handling with a clean, intuitive UI.

### Key Features
- Real-time chat with AI assistant
- Image upload and analysis
- Document attachment support
- Multiple personality profiles
- Offline error handling
- Cross-platform support (iOS, Android, Web)

---

## Architecture

The application follows a **Clean Architecture** pattern with clear separation of concerns:

```
┌─────────────────────────────────────────┐
│     Presentation Layer                  │
│  (React Native Components & Screens)    │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│     Application Layer                   │
│  (Use Cases & Business Logic)           │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│     Domain Layer                        │
│  (Entities & Business Rules)            │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│     Infrastructure Layer                │
│  (External Services & APIs)             │
└─────────────────────────────────────────┘
```

---

## Tech Stack

### Frontend
- **React Native 0.81.5** - Native mobile UI framework
- **Expo 54.0.27** - Development platform & build system
- **TypeScript 5.9.3** - Type-safe JavaScript
- **React Navigation 7** - Screen navigation & tabs
- **Gifted Chat 2.4.0** - Chat UI component
- **Expo Image Picker** - Image selection
- **Expo Document Picker** - File selection
- **Axios 1.13.2** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Vercel** - Serverless deployment platform
- **Google Generative AI SDK** - Gemini API integration

### Services
- **Google Gemini AI API** - AI responses & image analysis

---

## Project Structure

```
MyChatbotApp/
├── Presentation/              # UI Layer
│   └── screens/
│       ├── ChatScreen.tsx      # Main chat interface
│       ├── HomeScreen.tsx      # Home screen
│       ├── SettingsScreen.tsx  # Settings
│       ├── navigation/
│       │   └── TabNavigator.tsx # Bottom tab navigation
│       └── styles/
│           ├── ChatScreen.styles.ts
│           ├── HomeScreen.styles.ts
│           └── SettingsScreen.styles.ts
│
├── Application/               # Business Logic Layer
│   └── usecases/
│       ├── getChatErrorMessage.ts
│       ├── getGreeting.ts
│       ├── getNetworkErrorMessage.ts
│       └── sendMessage.ts
│
├── Domain/                    # Entity Layer
│   ├── Chat.ts               # Chat domain model
│   └── profiles/
│       └── DomainProfile.ts   # Profile definitions
│
├── Infrastructure/           # External Services Layer
│   └── GeminiAIService.ts    # AI service wrapper
│
├── backend/                  # Backend Server
│   ├── api/
│   │   └── ask.ts           # Serverless API endpoint
│   ├── package.json
│   └── .vercel/             # Vercel config
│
├── android/                 # Native Android files
├── app.json                 # Expo configuration
├── App.tsx                  # Main app entry
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── babel.config.js          # Babel config
└── metro.config.js          # Metro bundler config
```

---

## Setup & Installation

### Prerequisites
- **Node.js** v16+ and **npm** or **yarn**
- **Expo CLI**: `npm install -g expo-cli`
- **Vercel CLI**: `npm install -g vercel`
- Google Generative AI API key

### 1. Install Dependencies

```bash
cd MyChatbotApp
npm install
```

### 2. Configure Environment Variables

Create `.env.local` in the root directory:
```env
GEMINI_API_KEY=your_api_key_here
```

Create `backend/.env.local`:
```env
GEMINI_API_KEY=your_api_key_here
VERCEL_OIDC_TOKEN=your_vercel_token
```

### 3. Start Development Server

```bash
npm start
```

This opens the Expo development menu. From here you can:
- Press `a` to open on Android emulator
- Press `i` to open on iOS simulator
- Press `w` to open in web browser
- Scan QR code with Expo Go app on physical device

### 4. Deploy Backend

```bash
cd backend
vercel --prod
```

---

## Features

### 1. Chat Interface
- Real-time message display
- Typing indicator
- Auto-scroll to latest message
- Message history persistence

### 2. Image Upload & Analysis
- Take photo from camera
- Select image from photo library
- Automatic base64 encoding
- Quality compression (0.5) to meet size limits
- Gemini vision API analysis

### 3. Document Handling
- Select documents from file system
- Display document metadata
- Open documents on tap

### 4. Personality System
- Multiple AI personality profiles
- Customized greetings per personality
- Personality-specific error messages

### 5. Error Handling
- Network error detection
- Permission handling
- Graceful error messages
- Detailed console logging

---

## Development Guide

### Adding a New Screen

1. Create component in `Presentation/screens/`:
```typescript
// MyNewScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';

export function MyNewScreen() {
  return (
    <View>
      <Text>New Screen Content</Text>
    </View>
  );
}
```

2. Add to navigation in `Presentation/screens/navigation/TabNavigator.tsx`

### Creating a Use Case

1. Create file in `Application/usecases/`:
```typescript
// myUseCase.ts
export async function myUseCase(ai: GeminiAIService, params: any) {
  const result = await ai.ask(params.message, params.personality);
  return result;
}
```

2. Import and use in your component

### Styling Components

All styles are co-located with components:
```typescript
// ChatScreen.styles.ts
import { StyleSheet } from 'react-native';

export const chatStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // ... more styles
});
```

---

## Backend API

### Endpoint: `/api/ask`

**Method**: POST

**Request Body**:
```json
{
  "prompt": "Your message here",
  "personality": "default",
  "image": {
    "base64": "base64_encoded_image_data",
    "mimeType": "image/jpeg"
  }
}
```

**Response**:
```json
{
  "response": "AI generated response",
  "timestamp": 1234567890
}
```

### Features
- **Retry Logic**: Automatic retry with exponential backoff (3 retries)
- **Quota Handling**: Detects and handles rate limiting
- **Image Support**: Analyzes images via Gemini Vision API
- **Large Payloads**: Handles large base64 encoded images

### Error Handling
- Returns 400 for missing prompt/image
- Returns 500 for API failures
- Retries on quota limit (429) and server errors (5xx)

---

## Deployment

### Frontend Deployment

#### Option 1: Expo Application Services (EAS)
```bash
npm install -g eas-cli
eas login
eas build --platform ios
eas build --platform android
```

#### Option 2: Vercel (Web)
```bash
vercel deploy
```

### Backend Deployment

```bash
cd backend
vercel --prod
```

**Production URL**: https://chatbot-two-ruby.vercel.app

### Environment Variables for Production

Set in Vercel dashboard:
- `GEMINI_API_KEY` - Your Google Generative AI API key

---

## Configuration Files

### app.json
Main Expo configuration including:
- App metadata (name, version, icon)
- Platform-specific settings
- Permissions for iOS and Android
- EAS project ID

### tsconfig.json
TypeScript compiler options and path aliases

### babel.config.js
Babel preset for Expo and React Native

### metro.config.js
Metro bundler configuration for React Native

### package.json
Project dependencies and scripts

---

## Scripts

```bash
npm start              # Start Expo development server
npm run android        # Run on Android emulator
npm run ios           # Run on iOS simulator
npm run web           # Run in web browser
vercel --prod         # Deploy backend to production
expo prebuild --clean # Rebuild native code
```

---

## Troubleshooting

### Image Picker Not Opening

**Issue**: Modal closes but image picker doesn't appear

**Solution**:
1. Check permissions in `app.json` are correct
2. Ensure Android permissions are added:
   ```json
   "android": {
     "permissions": [
       "android.permission.READ_EXTERNAL_STORAGE",
       "android.permission.WRITE_EXTERNAL_STORAGE",
       "android.permission.CAMERA"
     ]
   }
   ```
3. Rebuild with `expo prebuild --clean`
4. Check console logs for permission errors

### Bundling Errors

**Issue**: "SyntaxError: Missing catch or finally clause"

**Solution**: All try blocks must have catch or finally clause

### API Connection Errors

**Issue**: Backend responses are slow or timeout

**Solution**:
1. Check GEMINI_API_KEY is set in environment
2. Verify backend is deployed: `vercel --prod`
3. Check quota limits on Google API console
4. Review server logs in Vercel dashboard

### Permission Denied Errors

**iOS**:
- Go to Settings > App > Photos and grant access

**Android**:
- Go to Settings > Apps > MyChatbotApp > Permissions and grant storage access

---

## Best Practices

### Code Organization
- Keep components in `Presentation/`
- Business logic in `Application/usecases/`
- Domain models in `Domain/`
- External services in `Infrastructure/`

### Performance
- Use memoization for expensive computations
- Compress images (quality: 0.5)
- Implement pagination for chat history
- Optimize re-renders with React.memo

### Error Handling
- Always wrap API calls in try-catch
- Provide user-friendly error messages
- Log errors to console for debugging
- Handle network errors gracefully

### Testing
- Write unit tests for use cases
- Test permission flows on real devices
- Test API integration with staging backend
- Verify image upload with various file sizes

---

## Support & Resources

- **Expo Documentation**: https://docs.expo.dev
- **React Native Docs**: https://reactnative.dev
- **Google Generative AI**: https://ai.google.dev
- **TypeScript**: https://www.typescriptlang.org

---

## Version History

**v1.0.0** (Current)
- Initial release
- Chat interface with Gemini AI
- Image analysis support
- Multi-platform deployment
- Backend API on Vercel

---

**Last Updated**: January 11, 2026
**Maintained By**: Development Team
