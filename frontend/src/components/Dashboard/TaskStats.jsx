const TaskStats = ({ stats }) => (
  <div className="bg-white p-6 rounded shadow">
    <h2 className="text-2xl font-semibold mb-4">Task Statistics</h2>
    <div className="flex space-x-6">
      <div>
        <p className="text-lg">Total Tasks: <span className="font-bold">{stats.totalTasks}</span></p>
      </div>
      <div>
        <p className="text-lg">Completed: <span className="font-bold text-green-600">{stats.completed}</span></p>
      </div>
      <div>
        <p className="text-lg">Pending: <span className="font-bold text-yellow-600">{stats.totalTasks - stats.completed}</span></p>
      </div>
    </div>
  </div>
);

export default TaskStats;