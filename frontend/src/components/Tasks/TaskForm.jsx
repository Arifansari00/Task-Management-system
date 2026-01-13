import { useState } from 'react';
import api from '../../utils/api';

const TaskForm = ({ projectId, onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Todo');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/tasks', { title, description, status, priority, dueDate, project: projectId });
      onAdd(res.data);
      setTitle('');
      setDescription('');
      setDueDate('');
    } catch (err) {
      alert('Failed to add task');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-6">
      <h3 className="text-xl mb-4">Add New Task</h3>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-2 mb-2 border rounded">
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full p-2 mb-2 border rounded">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Add Task</button>
    </form>
  );
};

export default TaskForm;