import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import TaskForm from '../components/Tasks/TaskForm';
import TaskItem from '../components/Tasks/TaskItem';

const TasksPage = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get(`/tasks/${projectId}`);
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, [projectId]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
    setShowForm(false);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(t => t._id === updatedTask._id ? updatedTask : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t._id !== id));
  };

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tasks for Project</h1>
        <div>
          <button onClick={() => setShowForm(!showForm)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            {showForm ? 'Cancel' : 'Add Task'}
          </button>
          <Link to="/projects" className="bg-blue-500 text-white px-4 py-2 rounded ml-2 hover:bg-blue-600">Back to Projects</Link>
        </div>
      </header>
      {showForm && <TaskForm projectId={projectId} onAdd={addTask} />}
      <div className="space-y-4">
        {tasks.map(task => (
          <TaskItem key={task._id} task={task} onUpdate={updateTask} onDelete={deleteTask} />
        ))}
      </div>
    </div>
  );
};

export default TasksPage;