import React from 'react';

const Logout = ({ onLogout ,setUser }) => {
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      fetch("/api/logout", {
        method: "DELETE",
      })
        .then(() => {
          setUser(null);
          setUserName("");
          window.location.href = "/"; // Redirect to home
        })
        .catch((error) => {
          console.error(error);
        });
    }

    if (onLogout) {
      onLogout();
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;

