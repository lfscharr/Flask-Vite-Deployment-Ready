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
          <NavLink to="/api/signup">Sign Up </NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;

