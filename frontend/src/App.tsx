import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import axios from "./utils/api";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import UserContext, {
  LoginToken,
  unauthenticatedUser,
} from "./context/UserContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RepliesPage from "./pages/RepliesPage";

const App: React.FC = () => {
  const { data } = useContext(UserContext);

  const [user, setUser] = useState<LoginToken | null>(null);
  const [loginError, setLoginError] = useState(null);

  // Validate saved user session on load
  useEffect(() => {
    const storageUser = localStorage.getItem("user");
    if (storageUser) {
      const parsedUser: LoginToken = JSON.parse(storageUser);
      validateSession(parsedUser);
    } else {
      setUser(unauthenticatedUser);
    }
  }, []);

  const validateSession = async (user: LoginToken) => {
    try {
      const response = await axios.get("/users/validate-session", {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      });
      if (response.status === 200) {
        setUser(user);
      } else {
        setUser(unauthenticatedUser);
      }
    } catch (error: any) {
      setUser(unauthenticatedUser);
    }
  };

  const login = async (username: string, password: string) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await axios.post("/users/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const newLoginToken: LoginToken = {
        ...response.data,
        isAuthenticated: true,
      };
      setUser(newLoginToken);
      localStorage.setItem("user", JSON.stringify(newLoginToken));
      window.location.href = "/";
    } catch (error: any) {
      setLoginError(error);
    }
  };

  const logout = async () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <UserContext.Provider
      value={{ data: user ?? data, error: loginError, login, logout }}
    >
      <Router>
        <Header />
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/post/:postId" element={<RepliesPage />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
