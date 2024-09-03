import React from 'react';
import { useUser } from '../context/UserContext';

const UserProfile: React.FC = () => {
  const { user, isAuthenticated } = useUser();

  if (!isAuthenticated) {
    return <div>Please log in.</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>User ID: {user?.id}</p>
      <p>Username: {user?.username}</p>
    </div>
  );
};

export default UserProfile;
