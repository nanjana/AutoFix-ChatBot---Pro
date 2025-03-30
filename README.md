# 🚗 AutoFix Pro Assistant

**AutoFix Pro Assistant** is an advanced AI-powered chatbot designed specifically for automotive troubleshooting and support. It assists users with vehicle-related issues using conversational intelligence, while offering a modern, responsive UI and multi-model LLM backend.

# Live Demo: https://auto-fix-chat-bot-pro.vercel.app/

## 🌟 What’s New in Pro Version (v2.0) vs. AutoFix v1.0

| Feature Area             | v1.0                           | Pro Version (v2.0)                                                                 |
|-------------------------|--------------------------------|-------------------------------------------------------------------------------------|
| **LLM Support**         | GPT-3.5 Turbo (only)           | Plug-and-play support for OpenAI (ChatGPT), Claude, and Gemini APIs                |
| **Model Flexibility**   | Hardcoded ChatGPT              | Backend-driven model switching with `.env` configuration                           |
| **Domain Control**      | General Automotive Replies     | Strict automotive expert logic—refuses unrelated questions                         |
| **UI Design**           | Basic Chat UI                  | Full-screen, modern, minimalist ChatGPT-style interface with sidebar for history   |
| **Voice Support**       | Limited, no visual feedback    | 🎙️ Built-in audio-to-text support using Whisper API                               |
| **Structured Replies**  | Single paragraph               | Cleaner structured text blocks with improved readability                           |
| **Export Feature**      | Text file download             | Enhanced chat download with one-click save                                        |
| **Robust Error Handling** | Minimal                      | Better detection for API issues, mic access errors, empty input, offline status    |

---

## 🛠️ Setup

### 1. Clone the Repo

```bash
git clone https://github.com/nanjana/AutoFix-ChatBot---Pro.git
cd autofixpro
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create Environment File
Create a .env file based on the .env.example template:

```ini
REACT_APP_LLM_PROVIDER=openai
REACT_APP_OPENAI_API_KEY=your_openai_key_here
# (Optional for future use)
# REACT_APP_CLAUDE_API_KEY=your_claude_key
# REACT_APP_GEMINI_API_KEY=your_gemini_key
```
❗ Never commit your .env file. It's already added to .gitignore.

## Run Locally
```bash
npm start
```

The app runs on http://localhost:3000

## LLM Switching
To switch models, update the .env file:

env
REACT_APP_LLM_PROVIDER=openai   # or 'claude' or 'gemini'
Restart the app after making changes.

## Features
Expert Auto Assistant Only: Chatbot is trained to respond strictly to car-related problems.

Follow-up Friendly: Supports chained queries and follow-up suggestions.

Mic Support: Voice input via Whisper API (OpenAI).

Export Chat: Save conversation as a .txt file.

Offline and Error Awareness: Alerts user of API failures, bad input, and network issues.

