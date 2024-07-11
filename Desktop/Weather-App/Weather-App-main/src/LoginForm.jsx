
import { useState } from 'react';
// import { auth, provider, signInWithPopup } from './firebase';

const LoginForm = ({ setShowLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    if (isLogin) {
      console.log('Logging in with:', email, password);
      // Add Firebase login logic here
      setError(''); // Clear any existing error message
      alert('Login successful!');
    } else {
      if (!name) {
        setError('Please provide your name.');
        return;
      }

      console.log('Signing up with:', name, email, password);
      localStorage.setItem('user', JSON.stringify({ name, email, password }));
      alert('You registered successfully!');
      setError(''); // Clear any existing error message
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
        setError(''); // Clear any existing error message
        setShowLogin(false);
      })
      .catch((error) => {
        console.error('Google Sign-In error:', error);
        setError('Google Sign-In failed. Please try again.');
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
          {error && <p className="error">{error}</p>}
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
