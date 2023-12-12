import { NavLink, Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div>
      <header>
        <nav>
          <NavLink to="/">Home </NavLink>
          <NavLink to="/signin">Sign In </NavLink>
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
