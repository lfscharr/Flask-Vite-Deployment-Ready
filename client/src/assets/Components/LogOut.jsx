import React from 'react';

const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      fetch("/api/logout", {
        method: "DELETE",
      })
        .then(() => {
          // Update state and redirect on successful logout
          setUser(null);
          setUserName("");
          window.location.href = "/"; // Redirect to home
        })
        .catch((error) => {
          console.error(error);
        });
    }

    // Call the onLogout callback if provided
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;

