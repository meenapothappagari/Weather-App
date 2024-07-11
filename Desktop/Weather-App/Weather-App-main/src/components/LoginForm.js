// LoginForm.js
import React, { useState } from 'react';
import { auth, provider, signInWithPopup } from './firebaseConfig';

const LoginForm = ({ setShowLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLogin) {
      console.log('Logging in with:', email, password);
    } else {
      console.log('Signing up with:', name, email, password);
      localStorage.setItem('user', JSON.stringify({ name, email, password }));
      alert('You registered successfully!');
    }
    setShowLogin(false);
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log('Google Sign-In successful:', user);
        localStorage.setItem('user', JSON.stringify({ name: user.displayName, email: user.email }));
        alert('Google Sign-In successful!');
        setShowLogin(false);
      })
      .catch((error) => {
        console.error('Google Sign-In error:', error);
        alert('Google Sign-In failed. Please try again.');
      });
  };

  return (
    <div className="login-form-container">
      <div className="login-form">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>
        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Create an account' : 'Already have an account? Login here'}
        </p>
        <button onClick={handleGoogleSignIn} className="google-signin-button">Sign In with Google</button>
        <button onClick={() => setShowLogin(false)}>Close</button>
      </div>
    </div>
  );
};

export default LoginForm;
