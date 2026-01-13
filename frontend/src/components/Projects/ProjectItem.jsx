import { useState } from 'react';
import api from '../../utils/api';

const ProjectItem = ({ project, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);

  const handleUpdate = async () => {
    try {
      const res = await api.put(`/projects/${project._id}`, { title, description });
      onUpdate(res.data);
      setIsEditing(false);
    } catch (err) {
      alert('Failed to update project');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this project?')) {
      try {
        await api.delete(`/projects/${project._id}`);
        onDelete(project._id);
      } catch (err) {
        alert('Failed to delete project');
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600">Save</button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-bold">{project.title}</h3>
          <p className="text-gray-600 mb-2">{project.description}</p>
          <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-600">Edit</button>
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
        </div>
      )}
    </div>
  );
};

export default ProjectItem;