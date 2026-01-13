// Reusable profile component (if needed separately)
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { logout } from '../../utils/auth';

const Profile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/auth/profile');
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Profile</h1>
        <Link to="/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Back to Dashboard</Link>
      </header>
      <div className="bg-white p-6 rounded shadow-md max-w-md">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <button onClick={logout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
      </div>
    </div>
  );
};

export default Profile;