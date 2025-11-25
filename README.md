# Anime List Project

A full‑stack anime tracking and recommendation web app built using **React**, **Node.js / Express**, and a **Python recommendation engine**. The project integrates with the **Jikan API / AniList API** to fetch anime data, allows users to maintain personalized anime lists, and provides ML‑based recommendations.

---

##  Features

### **Frontend (React)**

* Modern SPA built with React + React Router
* User authentication with JWT
* Light/Dark theme toggle with your custom pink aesthetic
* Search bar with dropdown suggestions
* Anime list management (add, update, delete entries)
* Profile page showing stats, favorites, and user history
* Popup component for actions and confirmations

### **Backend (Node.js / Express)**

* Token authentication middleware
* User routes (register, login, profile)
* Anime list CRUD routes
* REST API structure with clean controllers/services
* Secure password hashing

### **Recommendation Engine (Python)**

* Flask API endpoint `/recommend`
* Pulls user anime list from main API
* Uses ML (XGBoost or collaborative filtering) to recommend new anime
* Returns ranked list of recommendations to React

---

##  Project Structure

```
anime-list/
├── client/           # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── api_fetching/
│   │   └── App.jsx
│   └── package.json
│
├── server/           # Node backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   └── index.js
│
├── recommender/      # Python ML engine
│   ├── model.ipynb
│   └── app.py (Flask)
│
└── README.md
```

---

##  Tech Stack

### **Frontend**

* React + Vite
* React Router
* Context API for global auth + anime state
* TailwindCSS (if added later)

### **Backend**

* Node.js
* Express
* MongoDB + Mongoose
* JWT Authentication

### **Recommendation Engine**

* Python 3
* Flask
* XGBoost / Scikit-Learn
* Pandas / NumPy

---

##  Installation & Setup

### **1. Clone the repository**

```
git clone https://github.com/yourusername/anime-list.git
cd anime-list
```

### **2. Install frontend dependencies**

```
cd client
npm install
npm run dev   # start local dev server
```

### **3. Install backend dependencies**

```
cd server
npm install
npm run dev   # start Express API
```

### **4. Install Python recommender dependencies**

```
cd recommender
pip install -r requirements.txt
python app.py   # start Flask recommender API
```

---

## 🔌 Environment Variables

Create the following files:

### `server/.env`

```
MONGO_URI=your_mongo_url
JWT_SECRET=your_secret_here
```

---


### **Recommended platforms:**

Recommendatoin

---

##  Recommendation Workflow

1. User logs in
2. Frontend fetches user anime list from Node server
3. When the user clicks **“Recommend Anime”**, React calls:

   * `POST /recommend` → Python Flask API
4. ML model analyzes genres, ratings, watch history
5. Returns top recommendations
6. React displays them in a styled results page

---

##  Future Improvements

* Account settings page
* Improved recommendation accuracy
* Add Anime season charts and statistics
* Migrate from Context API → Redux Toolkit
* Implement OAuth with AniList

---

##  License

MIT License — free to use, modify, and redistribute.

---

## 👤 Author

**Omar Dukureh**