# 🤖 MyChatbotApp

[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54.0.27-000020.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)](https://www.typescriptlang.org/)
[![Gemini AI](https://img.shields.io/badge/Gemini%20AI-Powered-orange.svg)](https://ai.google.dev/)

> An intelligent cross-platform chatbot application powered by Google's Generative AI (Gemini API), built with React Native and Expo.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Backend API](#backend-api)
- [Deployment](#deployment)
- [License](#license)

---

## 🎯 Overview

MyChatbotApp is a React Native mobile application that provides an intelligent chatbot interface with support for:
- 💬 Text conversations
- 🖼️ Image analysis
- 📄 Document handling
- 📱 Cross-platform support (iOS, Android, Web)

---

## ✨ Features

- **Smart Chat Interface**: Real-time messaging with typing indicators and auto-scrolling
- **Multi-Modal Support**:
  - 📸 **Image Analysis**: Take photos or upload images for AI analysis via Gemini Vision API
  - 📎 **Document Handling**: Select and discuss file attachments
- **Personality Profiles**: Configurable AI personalities with unique greetings and error messages
- **Robust Error Handling**: Graceful management of network errors, permissions, and API limits

---

## 🏗️ Architecture

The project adheres to **Clean Architecture**, separating concerns into distinct layers:

```
┌─────────────────────────────────────────┐
│      Presentation Layer (UI)            │
│   ChatScreen, HomeScreen, Navigation    │
├─────────────────────────────────────────┤
│     Application Layer (Use Cases)       │
│   sendMessage, getGreeting, etc.        │
├─────────────────────────────────────────┤
│       Domain Layer (Business)           │
│    Chat Models, Domain Profiles         │
├─────────────────────────────────────────┤
│   Infrastructure Layer (External)       │
│      GeminiAIService, API Calls         │
└─────────────────────────────────────────┘
```

| Layer | Responsibility | Examples |
|-------|---------------|----------|
| **Presentation** | UI components and screens | `ChatScreen`, `HomeScreen` |
| **Application** | Use cases and business logic | `sendMessage`, `getGreeting` |
| **Domain** | Entities and business rules | `Chat.ts`, `DomainProfile.ts` |
| **Infrastructure** | External services | `GeminiAIService.ts` |

---

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React Native | 0.81.5 | Mobile framework |
| Expo | 54.0.27 | Development platform |
| TypeScript | 5.9.3 | Type safety |
| React Navigation | 7 | Navigation system |
| Gifted Chat | 2.4.0 | Chat UI components |
| Expo Image Picker | - | Image selection |
| Expo Document Picker | - | Document handling |

### Backend & Services
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Vercel | Serverless deployment |
| Google Generative AI SDK | Gemini API integration |

---

---

## 📁 Project Structure

```
MyChatbotApp/
├── 📱 Presentation/              # UI Components & Screens
│   ├── screens/                  # ChatScreen, HomeScreen, SettingsScreen
│   └── navigation/               # TabNavigator
├── ⚙️ Application/               # Business Logic (Use Cases)
│   └── usecases/                 # sendMessage, getGreeting, etc.
├── 🎯 Domain/                    # Data Models
│   ├── Chat.ts                   # Chat model
│   └── profiles/                 # Personality profiles
├── 🔧 Infrastructure/            # External APIs
│   └── GeminiAIService.ts        # Gemini API integration
├── 🌐 backend/                   # Serverless Backend
│   └── api/                      # API Endpoints (ask.ts)
└── 🚀 App.tsx                    # Entry Point
```

---

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js v16 or higher
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Google Generative AI API Key ([Get one here](https://ai.google.dev/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/MyChatbotApp.git
   cd MyChatbotApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm start
   ```
   
   Then choose your platform:
   - Press `a` for Android
   - Press `i` for iOS
   - Press `w` for Web

---

---

## 🌐 Backend API

The application communicates with a serverless backend hosted on Vercel.

### API Endpoint

**POST** `/api/ask`

### Request Format

```json
{
  "prompt": "User message",
  "personality": "default",
  "image": {
    "base64": "...",
    "mimeType": "image/jpeg"
  }
}
```

### Capabilities

- ✅ Handles large base64 payloads
- ✅ Automatic retries on failure
- ✅ API quota management
- ✅ Multi-modal support (text + images)

---

## 📦 Deployment

### Frontend Deployment

Deploy the mobile app using EAS Build:

```bash
# Install EAS CLI
npm install -g eas-cli

# Build for production
eas build --platform all
```

Or deploy the web version to Vercel:

```bash
npm run build
vercel --prod
```

### Backend Deployment

Deploy to Vercel:

```bash
cd backend
vercel --prod
```

> **⚠️ Important**: Ensure `GEMINI_API_KEY` is set in your Vercel project settings under Environment Variables.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/MyChatbotApp/issues).

---

## 👨‍💻 Author

Your Name - [@yourhandle](https://twitter.com/yourhandle)

---

<div align="center">
  <strong>Made with ❤️ using React Native & Gemini AI</strong>
</div>