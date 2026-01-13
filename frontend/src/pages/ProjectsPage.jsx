import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import ProjectForm from '../components/Projects/ProjectForm';
import ProjectItem from '../components/Projects/ProjectItem';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProjects();
  }, []);

  const addProject = (project) => {
    setProjects([...projects, project]);
    setShowForm(false);
  };

  const updateProject = (updatedProject) => {
    setProjects(projects.map(p => p._id === updatedProject._id ? updatedProject : p));
  };

  const deleteProject = (id) => {
    setProjects(projects.filter(p => p._id !== id));
  };

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <div>
          <button onClick={() => setShowForm(!showForm)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            {showForm ? 'Cancel' : 'Add Project'}
          </button>
          <Link to="/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded ml-2 hover:bg-blue-600">Back to Dashboard</Link>
        </div>
      </header>
      {showForm && <ProjectForm onAdd={addProject} />}
      <div className="space-y-4">
        {projects.map(project => (
          <ProjectItem key={project._id} project={project} onUpdate={updateProject} onDelete={deleteProject} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;