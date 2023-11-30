import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import axios from "./utils/api";

import Header from "./components/Header";
import HomePage from "./pages/Home";
import UserContext, {
  LoginToken,
  unauthenticatedUser,
} from "./context/UserContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

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
      setUser({
        ...response.data,
        isAuthenticated: true,
      });
      localStorage.setItem("user", JSON.stringify(response.data));
      window.location.href = "/";
    } catch (error: any) {
      setLoginError(error);
    }
  };

  return (
    <UserContext.Provider
      value={{ data: user ?? data, error: loginError, login }}
    >
      <Router>
        <Header />
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
