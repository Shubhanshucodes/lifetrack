import React, { useState } from 'react';
import axios from 'axios';

const Signin = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signin', form, {
        withCredentials: true, // if using cookies
      });
      alert('Signin successful!');
    } catch (err) {
      alert(err.response?.data?.message || 'Signin failed');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Signin</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

const styles = {
  container: { padding: '40px', maxWidth: '400px', margin: 'auto' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px' },
};

export default Signin;
