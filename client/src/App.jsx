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


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path='api/signin' element={<SignIn />} />
      <Route path="new" element={<SignUp />} />
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;

