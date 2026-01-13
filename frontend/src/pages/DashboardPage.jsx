import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import ProjectList from '../components/Dashboard/ProjectList';
import TaskStats from '../components/Dashboard/TaskStats';
import { logout } from '../utils/auth';

const DashboardPage = () => {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({ totalTasks: 0, completed: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsRes = await api.get('/projects');
        setProjects(projectsRes.data);

        let totalTasks = 0;
        let completed = 0;
        for (const project of projectsRes.data) {
          const tasksRes = await api.get(`/tasks/${project._id}`);
          totalTasks += tasksRes.data.length;
          completed += tasksRes.data.filter(t => t.status === 'Done').length;
        }
        setStats({ totalTasks, completed });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div>
          <Link to="/projects" className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600">Manage Projects</Link>
          <Link to="/profile" className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600">Profile</Link>
          <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
        </div>
      </header>
      <ProjectList projects={projects} />
      <TaskStats stats={stats} />
    </div>
  );
};

export default DashboardPage;