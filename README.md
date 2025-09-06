URL Shortener & Client-Side Logging Application
This project is a web-based URL shortener application built with a modern, decoupled architecture. It features a React frontend for user interaction and a secure Node.js proxy for handling client-side logging.

Overview
The system is composed of two primary services:

Frontend (url-shortener): A single-page application built with React that provides the user interface for shortening URLs and viewing usage statistics.

Logger Proxy (logger-proxy): A lightweight Node.js server that securely receives log data from the frontend, attaches an authentication token, and forwards it to a designated evaluation service. This protects sensitive tokens from being exposed in the browser.

Features
URL Shortening: A simple interface to submit long URLs and receive a shortened version.

Usage Statistics: A dedicated page to view a list of all URLs shortened during the current session.

Secure Client-Side Logging: All important user actions and errors on the frontend are logged via a secure proxy, ensuring no sensitive credentials are exposed.

Decoupled Architecture: The frontend and proxy are separate services, allowing them to be developed, deployed, and scaled independently.

Tech Stack
Frontend: React (Create React App)

Logger Proxy: Node.js, Express.js

Environment Management: dotenv

Setup and Installation
To run this project locally, you will need to set up and run both the frontend and the logger-proxy services in separate terminals.

Prerequisites
Node.js (v14 or later)

npm

1. Clone the Repository
git clone <your-repo-url>
cd <your-repo-name>

2. Set Up the Logger Proxy
Navigate to the proxy directory and install dependencies:

cd logger-proxy
npm install

Create an environment file: Create a new file named .env in the logger-proxy directory.

Add your log token to the .env file: This token is required to authenticate with the evaluation service.

LOG_TOKEN="your_secret_auth_token_here"

3. Set Up the Frontend
Navigate to the frontend directory and install dependencies:

cd ../url-shortener
npm install

Create a local environment file: Create a new file named .env.local in the url-shortener directory.

Configure the proxy URL: Add the following line to your .env.local file. This tells the React app where to send its logs.

REACT_APP_PROXY_LOG_URL=http://localhost:4000/logs

Running the Application
You will need two separate terminals open to run both services simultaneously.

Terminal 1: Start the Logger Proxy

cd logger-proxy
node server.js
# Expected output: Proxy running at http://localhost:4000/logs

Terminal 2: Start the Frontend

cd url-shortener
npm start
# Expected output: Your browser will open to http://localhost:3000 (or another port if 3000 is busy)

Your URL shortener application is now running locally!
