import React, { useEffect, useState } from 'react';
import API from "../api";

const UserProfile = () => {
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get('/user'); // backend API for profile
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await API.put('/user', user);
      alert('Profile updated!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input name="name" value={user.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={user.email} placeholder="Email" disabled />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default UserProfile;
