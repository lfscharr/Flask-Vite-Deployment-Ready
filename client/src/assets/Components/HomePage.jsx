import React, { useState, useEffect } from "react";
import RootLayout from "../RootLayout";
import LogWorkout from "./LogWorkout";
import UserProfile from "./UserProfile";
import WorkoutHistory from "./WorkoutHistory";
import Logout from "./LogOut";
import SignUp from "./SignUp";

function HomePage({user,setUser}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  function handleNameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/api/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }

  if (!user) {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Username</h2>
          <input type="text" value={username} onChange={handleNameChange} />
          <h2>Password</h2>
          <input type="text" value={password} onChange={handlePasswordChange} />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <>
      <h1>Welcome, {user.username}!</h1>
      <div id="video-container">
       <video id="video" src= "/src/assets/Components/4783739_Women_Gym_Exercise_1920x1080.mp4"
            autoPlay="{true}" loop muted> 
        </video> 
        </div>
      <LogWorkout userId={user.id} />
      <UserProfile userId={user.id} />
      <Logout  user={user} setUser={setUser} />
    </>
  );
}

export default HomePage;
