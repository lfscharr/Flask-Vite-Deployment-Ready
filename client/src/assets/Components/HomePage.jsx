import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import RootLayout from '../RootLayout';
import LogWorkout from './LogWorkout';
import UserProfile from './UserProfile';
import WorkoutHistory from './WorkoutHistory';
import SignIn from './SignIn';
import router from './routes';
import Logout from './LogOut';

function HomePage() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");
    const [user, setUser] = useState(null);
    
      // useEffect(() => {
      //   fetch("/api/check_session")
      //     .then((res) => res.json())
      //     .then((session) => console.log(session));
      // }, []);
      useEffect(() => {
        fetch("/api/check_session")
        .then((res) => {
          if (res.ok) {
            res.json()
            .then((user) => setUser(user));
          }
        });
      }, []);
      console.log(user);
    
      function handleNameChange(e) {
        setUserName(e.target.value);
      }
    
      function handlePasswordChange(e) {
        setPassword(e.target.value);
      }
    
      function handleSubmit(e) {
        e.preventDefault();
        console.log(user);
        fetch("/api/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: username, password: password }),
        })
          .then((res) => res.json())
          .then((data) => setUser(data));
      }
    
    //   function handleLogout(e) {
    //     e.preventDefault();
      
        // Show a confirmation dialog before logging out
    //     if (window.confirm("Are you sure you want to log out?")) {
    //       fetch("/api/logout", {
    //         method: "DELETE",
    //       })
    //         .then(() => {
    //           // Update state and redirect on successful logout
    //           setUser(null);
    //           setUserName("");
    //           window.location.href = "/"; // Redirect to home
    //         })
    //         .catch((error) => {
    //           console.error(error);
    //         });
    //     }
    //   }


      if (!user) {
            return (
              <form onSubmit={handleSubmit}>
                <h2>Username</h2>
                <input type="text" value={username} onChange={handleNameChange} />
                <h2>Password</h2>
                <input type="text" value={password} onChange={handlePasswordChange} />
                <button type="submit">Login</button>
              </form>
            );
          }
          return (
            <>
              <h1>Welcome, {user.username}</h1>
                <UserProfile userId={user.id} />
                <LogWorkout userId={user.id} />
                <WorkoutHistory />
              <button onLogout={handleLogout}>Logout</button>
            </>
          );
        }

        


export default HomePage;

