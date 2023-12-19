import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <div>
      <header>
        <nav>
          <NavLink to="/">Home </NavLink>
          <NavLink to="/api/signin">Sign In </NavLink>
          <NavLink to="/signup">Sign Up </NavLink>
          <NavLink to="/logout">Logout </NavLink>
          <NavLink to="/log">Workout Logs </NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;

