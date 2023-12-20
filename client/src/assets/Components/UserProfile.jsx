
import React, { useState, useEffect } from 'react';
import EditProfile from './EditProfile.jsx';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError('An error occurred while fetching user data.');
        console.error('Fetch user profile failed:', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleDeleteProfile = async () => {
    try {
      const response = await fetch(`http://localhost:5000/user/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Profile deleted successfully');
      } 
      else {
        const errorData = await response.json();
        setError(errorData.message || 'Profile deletion failed');
        console.error('Profile deletion failed:', errorData);
      }
    } 
    catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Profile deletion failed:', error);
    }
  };

  return (
    <div>
      {user && (
        <div>
          <h2>User Profile</h2>
          <p>Username: {user.username}</p>
          <button onClick={() => setShowEditForm(true)}>Edit Profile</button>
          <button onClick={handleDeleteProfile}>Delete Profile</button>
          {showEditForm && <EditProfile userId={userId} />}
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default UserProfile;
