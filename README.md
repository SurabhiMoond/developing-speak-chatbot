# developing-speak-chatbot
I am developing speak input output chatbot

# Project Title

## Introduction
This project is designed to develop a chatbot that accepts speech input and provides speech output. It focuses on integrating speech recognition and natural language processing to create an interactive user experience, solving the problem of efficient and hands-free communication with a chatbot.

## Project Type
Frontend

## Deployed App
You can access the deployed frontend of the project here: https://developing-speak-chatbot-khub.vercel.app/

## Directory Structure

GPT-Bot/
├─ src/
│  ├─ assets/
│  ├─ components/
│  ├─ pages/
│  ├─ styles/
├─ public/
├─ .env
├─ package.json
└─ vite.config.js

## Features

Key features of the application include:

- **D-ID Integration**: Uses the D-ID API for generating and managing digital identities.
- **Cohere API Integration**: Implements natural language processing with the Cohere API for text analysis and generation.
- **Speech Recognition**: Utilizes the browser's `window.speechRecognition` API for voice command functionality.
- **Responsive Design**: Ensures that the app is fully responsive and optimized for various devices using simple CSS.
- **Axios for HTTP Requests**: Manages API requests with Axios for efficient communication with external services.

## Design Decisions & Assumptions

- **Vite**: Selected as the build tool due to its speed and ease of use during development.
- **CSS**: Simple CSS was chosen to keep the styling lightweight and maintain cross-browser compatibility.
- **Environment Variables**: Sensitive information like API keys is managed through a `.env` file to keep them secure.
- **Frontend Only**: The project is purely frontend-based, with all data processing occurring client-side.

## Installation & Getting Started

To set up and run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SurabhuMoond/developing-speak-chatbot.git
   cd developing-speak-chatbot
   npm install
   npm i axios
   ```
2. **Set up environment variables**:
   ```bash
    Create a .env file in the root directory.
   ```
3. **Add your API keys**:
   ```bash
    VITE_DID_API_KEY=your-did-api-key
    VITE_COHERE_API_KEY=your-cohere-api-key
   ```
4. **Start the development server**:
   ```
    npm run start
   ```
## Tech Stack :

 -Frontend: Vite, React, Axios
 -Styling: CSS
 -APIs: D-ID API, Cohere API
 -Utilities: Window SpeechRecognition, .env for environment variables
   

    




