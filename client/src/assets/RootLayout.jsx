import { NavLink, Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div>
      <header>
        <nav>
          <NavLink to="/">Home </NavLink>
          <NavLink to="/signin">Sign Up </NavLink>
          <NavLink to="/signup">Sign In </NavLink>
          <NavLink to="/workout">Workouts </NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
