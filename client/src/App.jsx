import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0)
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
    fetch("/api/check_session").then((res) => {
      if (res.ok) {
        res.json().then((user) => setUser(user));
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
    </>
  );

  // return (
  //   <>
  //     <div>
  //       <a href="https://vitejs.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.jsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )
}

export default App;
