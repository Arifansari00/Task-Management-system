import { Link } from 'react-router-dom';

const ProjectList = ({ projects }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-semibold mb-4">Your Projects</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <div key={project._id} className="bg-white p-4 rounded shadow hover:shadow-lg">
          <h3 className="text-xl font-bold">{project.title}</h3>
          <p className="text-gray-600 mb-2">{project.description}</p>
          <Link to={`/tasks/${project._id}`} className="text-blue-500 hover:underline">View Tasks</Link>
        </div>
      ))}
    </div>
  </div>
);

export default ProjectList;