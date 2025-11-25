# Anime List Project

A full-stack web application for tracking anime, managing personal
watchlists, and generating recommendations. Built with React,
Node.js/Express, and a Python machine learning engine.

## Features

### Frontend (React)

-   Modern UI for searching and browsing anime
-   User login and JWT authentication
-   Add, edit, and delete anime from a personal list
-   Profile page with basic stats
-   Light and dark mode

### Backend (Node.js / Express)

-   User authentication and token validation
-   Anime list CRUD routes
-   MongoDB with Mongoose
-   Organized REST API structure

### Recommendation Engine (Python)

-   Flask server with a `/recommend` endpoint
-   Processes the user's anime list
-   Uses collaborative filtering to generate recommendations

## Project Structure

    anime-list/
    ├── client/        # React frontend
    ├── server/        # Node.js backend
    └── recommender/   # Python ML engine

## Setup

### 1. Clone the repository

    git clone https://github.com/yourusername/anime-list.git
    cd anime-list

### 2. Install frontend

    cd client
    npm install
    npm run dev

### 3. Install backend

    cd server
    npm install
    npm run dev

### 4. Install Python recommender

    cd recommender
    pip install -r requirements.txt
    python app.py

## Environment Variables

Create a `server/.env` file:

    MONGO_URI=your_mongo_url
    JWT_SECRET=your_secret_key

## Recommendation Flow

1.  User logs in.
2.  Frontend fetches the user's anime list.
3.  React sends a POST request to `/recommend` on the Python API.
4.  The model analyzes the user's data.
5.  A ranked list of recommended anime is returned.
6.  The frontend displays the results.

## Future Improvements

-   Better recommendation accuracy
-   Account settings page
-   Seasonal charts and statistics
-   Optional OAuth integration with AniList

## Author

Omar Dukureh