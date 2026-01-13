import { useState } from 'react';
import api from '../../utils/api';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate ? task.dueDate.split('T')[0] : '');

  const handleUpdate = async () => {
    try {
      const res = await api.put(`/tasks/${task._id}`, { title, description, status, priority, dueDate });
      onUpdate(res.data);
      setIsEditing(false);
    } catch (err) {
      alert('Failed to update task');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this task?')) {
      try {
        await api.delete(`/tasks/${task._id}`);
        onDelete(task._id);
      } catch (err) {
        alert('Failed to delete task');
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
            className="w-full p-2 mb-2 border rounded"
          />
          <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600">Save</button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-bold">{task.title}</h3>
          <p className="text-gray-600 mb-2">{task.description}</p>
          <p><strong>Status:</strong> {task.status}</p>
          <p><strong>Priority:</strong> {task.priority}</p>
          <p><strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</p>
          <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-600">Edit</button>
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;