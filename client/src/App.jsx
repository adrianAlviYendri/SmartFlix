import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router";
import { Routes } from "react-router";
import Login from "./Users/pages/Login";
import Register from "./Users/pages/Register";
import MyFavoriteList from "./movie/pages/MyFavoriteList";
import Home from "./movie/pages/home";
import { Provider } from "react-redux";
import store from "./store";
import PublicPage from "./movie/pages/PublicPage";
import RecommendationPage from "./movie/pages/RecommendationPage";
import ProfilePage from "./movie/pages/ProfilePage";
import Navbar from "./Users/components/navbar";
import Auth from "./Users/components/Auth";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/" element={<PublicPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/home" element={<Auth />}>
            <Route index element={<Home />} />
            <Route path="favorite-list" element={<MyFavoriteList />} />
            <Route path="add-favorite/:id" element={<MyFavoriteList />} />
            <Route path="recomendation" element={<RecommendationPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="logout" element={<RecommendationPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
