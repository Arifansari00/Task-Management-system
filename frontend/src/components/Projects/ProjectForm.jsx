import { useState } from 'react';
import api from '../../utils/api';

const ProjectForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/projects', { title, description });
      onAdd(res.data);
      setTitle('');
      setDescription('');
    } catch (err) {
      alert('Failed to add project');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-6">
      <h3 className="text-xl mb-4">Add New Project</h3>
      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Add Project</button>
    </form>
  );
};

export default ProjectForm;