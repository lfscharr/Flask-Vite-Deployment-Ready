import { useEffect, useState } from "react";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import RootLayout from "./assets/RootLayout";
import SignUp from "./assets/Components/SignUp";
// import HomePage from "./assets/Components/HomePage"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage/>} />
      <Route path="new" element={<SignUp handleSignUp={handleSignUp}/>} />
      <Route path="/logout" element={handleLogout}/>
    </Route>
  )
);


function App() {
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

  function handleLogout(e) {
    e.preventDefault();
    fetch("/api/logout", {
      method: "DELETE",
    }).then(setUserName(null));
  }
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
      <form onSubmit={handleSubmit}></form>
      <button onClick={handleLogout}>Logout</button>
    <>
    <RouterProvider router={router} />
    </>
    </>
  );
}

export default App;
