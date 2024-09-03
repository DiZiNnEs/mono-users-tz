import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import { UserProvider, useUser } from './context/UserContext';

const App: React.FC = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthCheck />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

const AuthCheck: React.FC = () => {
  const { user } = useUser();

  if (user) {
    return <Navigate to="/user" />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default App;
