import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Search from './pages/Search';
import Leaderboard from './pages/Leaderboard';
import Contact from './pages/Contact';
import CheckInd from './pages/CheckInd';
import AddPoints from './pages/AddPoints';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { useAuthContext } from './contexts/AuthContext';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/check-ind" element={<CheckInd />} />
      <Route path="/add-points" element={<AddPoints />} />
      <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <AppRoutes />
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;