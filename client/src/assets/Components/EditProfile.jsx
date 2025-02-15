import React, { useState, useEffect } from "react";

const EditProfile = ({ userId }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (userId) {
        try {
          const response = await fetch(`/api/user/${userId}`);
          const data = await response.json();

          setUser(data);
          setUsername(data.username);
        } catch (error) {
          console.error("Fetch user profile failed:", error);
          setError("An error occurred while fetching user data.");
        }
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleEditProfile = async () => {
    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log("Profile updated successfully");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Profile update failed");
        console.error("Profile update failed:", errorData);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Profile update failed:", error);
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="New Username"
        value={username || ""}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        value={password || ""}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleEditProfile}>Update Profile</button>
    </div>
  );
};

export default EditProfile;
