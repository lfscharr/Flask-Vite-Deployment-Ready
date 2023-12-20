import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import RootLayout from './assets/RootLayout';
import HomePage from './assets/Components/HomePage';
import SignIn from './assets/Components/SignIn';
import SignUp from './assets/Components/SignUp';
import Logout from './assets/Components/LogOut';
import LogWorkout from './assets/Components/LogWorkout';
import UserProfile from './assets/Components/UserProfile';
import WorkoutHistory from './assets/Components/WorkoutHistory';
import { useState,useEffect } from 'react';
import EditProfile from './assets/Components/EditProfile';



function App() {

  const [user,setUser] = useState(null)
  console.log(user)

  useEffect(() => {
    fetch("/api/check_session").then((res) => {
      if (res.ok) {
        res.json().then((user) => setUser(user));
      }
    });
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage user={user} setUser={setUser}/>} />
        <Route path='api/signin' element={<SignIn user={user} setUser={setUser} />} />
        <Route path="/signup" element={<SignUp user={user} setUser={setUser} />} />
        <Route path="/log" element={<WorkoutHistory user={user} setUser={setUser} />} />
        <Route path="/user" element={<EditProfile user={user} setUser={setUser} />} />
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  );
}

export default App;

