import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./Profile.css";
import "./HomePage.css";
import UserContext, { LoginToken } from "../context/UserContext";

const Profile: React.FC = () => {
  const { data, logout } = useContext(UserContext);
  const [user, setUser] = useState<LoginToken | null>(null);

  useEffect(() => {
    console.log("Received data:", data);
    setUser(data);
  }, [data]);

  return (
    <Container className="HomeContainer">
      <div className="HomeBodyDiv">
        <main>
          <section className="profile">
            {user?.isAuthenticated ? (
              <div>
                <img src="profile-picture.jpg" alt="Profile Picture" />
                <h2>{`${user?.user.first_name}`}</h2>
                <p>Email: {user?.user.email}</p>
              </div>
            ) : (
              <p style={{ color: "black" }}>Loading user data...</p>
            )}
          </section>
        </main>
      </div>
    </Container>
  );
};

export default Profile;
