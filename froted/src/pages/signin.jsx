import { useAuth } from '../context/AuthContext';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signin = () => {

  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useAuth(); // <-- Use login from AuthContext
  const navigate = useNavigate();
  function handler(){
    navigate('/signup')}
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signin', form, {
        withCredentials: true,
      });

      login(res.data.user); // <-- Save user to context
      alert('Signin successful!');
      navigate('/profile'); // or '/dashboard' or wherever you want to go
    } catch (err) {
      alert(err.response?.data?.message || 'Signin failed');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Please Signin to access the content</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      <br/> <br/>
      <div> Don't have an account? <button onClick={handler}>Signup</button></div>
    </div>
  );
};

const styles = {
  container: { padding: '40px', maxWidth: '400px', margin: 'auto' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px' },
};

export default Signin;
