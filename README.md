# SmartFlix

SmartFlix is an AI-powered movie recommendation platform that offers features such as movie search, personalized recommendations, favorites management, and movie payments. The project consists of two main parts: a **Backend (server)** built with Node.js, Express, and Sequelize, and a **Frontend (client)** built with React and Redux Toolkit.

---

## Main Features

### Backend (Server)

- **Authentication & Authorization**: Register, login (email/password & Google OAuth), JWT-based authentication.
- **Movie Management**: Retrieve public and private movie lists, search movies, and add movies to favorites.
- **Favorites**: Add, view, and remove user favorite movies.
- **User Profile**: View and update username.
- **AI Recommendations**: Get movie recommendations based on user preferences using Google Gemini AI.
- **Payment Integration**: Checkout and payment via Midtrans.
- **Error Handling**: Consistent error handling middleware.
- **Testing**: Unit and integration tests using Jest & Supertest.

### Frontend (Client)

- **Authentication**: Register, login, Google Sign-In.
- **Public Movie List**: View and search movies without logging in.
- **User Dashboard**: After login, users can view movies, add to favorites, manage profile, and make payments.
- **AI Recommendations**: Input preferences to get AI-powered movie recommendations.
- **Cart**: Add movies to cart, select for checkout, and pay via Midtrans.
- **Modern UI**: Built with Bootstrap, SweetAlert2, and responsive design.

---

## Project Structure

```
SmartFlix/
│
├── client/         # React Frontend (Vite)
│   ├── src/
│   │   ├── movie/  # Movie, favorites, recommendation, cart features, etc.
│   │   └── Users/  # Authentication & profile features
│   ├── public/
│   └── ...
│
├── server/         # Express Backend
│   ├── models/     # Sequelize models (User, Movie, Favorite)
│   ├── migrations/ # Database migrations
│   ├── seeders/    # Initial data seeders
│   ├── helpers/    # Helpers (bcrypt, jwt)
│   ├── middleware/ # Middleware (auth, error handler)
│   ├── services/   # AI integration (Gemini)
│   ├── __test__/   # Unit & integration tests
│   └── ...
│
└── README.md       # Main documentation
```

---

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/username/SmartFlix.git
cd SmartFlix
```

### 2. Setup Backend (Server)

```sh
cd server
cp .env.example .env
# Fill in the variables in .env (TMDB_API_KEY, JWT_SECRET, etc.)
npm install
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm start
```

Server runs at `http://localhost:3000`

### 3. Setup Frontend (Client)

```sh
cd client
cp .env.example .env
# Fill in VITE_GOOGLE_CLIENT_ID with your Google OAuth credentials
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## API Documentation

Full backend API documentation is available at [server/readme.md](server/readme.md).

---

## Technologies Used

- **Backend**: Node.js, Express, Sequelize, PostgreSQL, JWT, Google OAuth, Midtrans, Google Gemini AI
- **Frontend**: React, Redux Toolkit, Bootstrap, SweetAlert2, Vite
- **Testing**: Jest, Supertest

---

> SmartFlix - AI Movie Recommendation Platform for a smarter and more personal movie
