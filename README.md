# chatbot
# MyChatbotApp - Project Documentation

## 1. Project Overview
MyChatbotApp is a React Native mobile application built with **Expo** that provides an intelligent chatbot interface powered by **Google's Generative AI (Gemini API)**. It is designed to support text conversations, image analysis, and document handling within a clean, cross-platform UI (iOS, Android, Web).

## 2. Architecture
The project adheres to **Clean Architecture**, separating concerns into distinct layers to ensure maintainability and scalability:

* **Presentation Layer**: UI components and screens (e.g., `ChatScreen`, `HomeScreen`).
* **Application Layer**: Use cases and business logic (e.g., `sendMessage`, `getGreeting`).
* **Domain Layer**: Entities and business rules (e.g., `Chat.ts`, `DomainProfile.ts`).
* **Infrastructure Layer**: External services (e.g., `GeminiAIService.ts`).

## 3. Tech Stack
### Frontend
* **Framework**: React Native 0.81.5
* **Platform**: Expo 54.0.27
* **Language**: TypeScript 5.9.3
* **Navigation**: React Navigation 7
* **UI Components**: Gifted Chat 2.4.0 (Chat UI)
* **Media**: Expo Image Picker, Expo Document Picker

### Backend & Services
* **Runtime**: Node.js
* **Deployment**: Vercel (Serverless)
* **AI Service**: Google Generative AI SDK (Gemini API)

## 4. Project Structure
The file structure reflects the architecture:

MyChatbotApp/
├── Presentation/              # UI Components & Screens
│   ├── screens/               # ChatScreen, HomeScreen, SettingsScreen
│   └── navigation/            # TabNavigator
├── Application/               # Business Logic (Use Cases)
│   └── usecases/              # sendMessage, getGreeting, etc.
├── Domain/                    # Data Models
│   ├── Chat.ts                # Chat model
│   └── profiles/              # Personality profiles
├── Infrastructure/            # External APIs
│   └── GeminiAIService.ts     # Gemini API integration
├── backend/                   # Serverless Backend
│   └── api/                   # API Endpoints (ask.ts)
└── App.tsx                    # Entry Point

## 5. Key Features
1.  **Smart Chat Interface**: Real-time messaging with typing indicators and auto-scrolling.
2.  **Multi-Modal Support**:
    * **Image Analysis**: Users can take photos or upload images for AI analysis via the Gemini Vision API.
    * **Document Handling**: Support for selecting and discussing file attachments.
3.  **Personality Profiles**: Configurable AI personalities with unique greetings and error messages.
4.  **Robust Error Handling**: Graceful management of network errors, permissions, and API limits.

## 6. Backend API
The app communicates with a serverless backend hosted on Vercel.

* **Endpoint**: `/api/ask`
* **Method**: `POST`
* **Request Format**:
    {
      "prompt": "User message",
      "personality": "default",
      "image": { "base64": "...", "mimeType": "image/jpeg" }
    }
* **Capabilities**: Handles large base64 payloads, retries on failure, and manages API quotas.

## 7. Setup & Installation

### Prerequisites
* Node.js v16+
* Expo CLI (`npm install -g expo-cli`)
* Google Generative AI API Key

### Steps
1.  **Install Dependencies**:
    `npm install`
2.  **Environment Setup**:
    Create `.env.local` in the root:
    `GEMINI_API_KEY=your_api_key_here`
3.  **Start Development**:
    `npm start`
    * Press `a` for Android, `i` for iOS, or `w` for Web.

## 8. Deployment
* **Frontend**: Deploy via EAS (`eas build`) or Vercel.
* **Backend**: Deploy to Vercel.
    `cd backend`
    `vercel --prod`
    * *Note*: Ensure `GEMINI_API_KEY` is set in your Vercel project settings.