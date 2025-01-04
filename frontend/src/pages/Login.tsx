import React from 'react';
import LoginForm from '../components/forms/LoginForm';

const Login = () => {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-card p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;