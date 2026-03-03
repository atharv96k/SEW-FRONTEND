# Smart Email Writer - Frontend

This repository contains the React-based web interface for the **Smart Email Writer**. It allows users to manually paste email content, select a preferred tone, and generate AI-powered replies using the integrated backend service.

## 🚀 Features

* **Interactive UI**: A clean, modern interface built with React for an effortless user experience.
* **Tone Selection**: Customize the AI's response style (e.g., Professional, Casual, or Friendly) to match the context of your conversation.
* **Real-time Generation**: Communicates with the Spring Boot backend to provide instant email drafts.
* **One-Click Copy**: Easily copy the generated response to your clipboard for use in any email client.

## 🛠️ Tech Stack

* **Framework**: React 18 (Vite)
* **HTTP Client**: Axios
* **Styling**: Material UI (MUI)
* **Build Tool**: Vite

## 🏗️ Project Structure

```text
email-writer-frontend/
├── src/
│   ├── App.jsx        # Main application logic and UI components
│   ├── main.jsx       # Application entry point
│   └── index.css      # Global styles
├── public/            # Static assets
├── package.json       # Project dependencies and scripts
└── vite.config.js     # Vite configuration

```

## 📋 Prerequisites

* **Node.js**: Version 18.x or higher
* **Package Manager**: NPM or Bun (as indicated by the `bun.lock` file in the repo)
* **Backend**: Ensure the [Smart Email Writer Backend] is running at `http://localhost:8080`.

## 🚀 Getting Started

1. **Navigate to the frontend directory**:
```bash
cd smart-email-frontend

```


2. **Install dependencies**:
```bash
npm install
# OR
bun install

```


3. **Run the development server**:
```bash
npm run dev

```


4. **Access the App**: Open [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173) in your browser.

## 🖼️ Working Images

### 1. Main Dashboard

The dashboard provides a simple text area where you can paste the email you received.

### 2. Tone Configuration & Generation

Select your desired tone from the dropdown menu and hit "Generate Reply". The app displays a loading state while fetching the response from the AI.

### 3. Generated Output

The generated response appears in a dedicated output box, allowing you to review or copy the text before sending.

---

## 🤝 Integration

This frontend is a component of the Smart Email Writer ecosystem:

* **Backend**: Processes AI logic via Google Gemini.
* **Chrome Extension**: Provides the same functionality directly inside the Gmail interface.