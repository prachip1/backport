import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { ImGithub } from 'react-icons/im';
import { TbExternalLink } from 'react-icons/tb';
import { MdOutlineFolder } from 'react-icons/md';

Modal.setAppElement('#root');

export default function ShowProjects() {
  const [projdata, setProjdata] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://backport-backend.vercel.app/api/showprojects');
        setProjdata(response.data);
      } catch {
        console.error('Error fetching projects');
      }
    };
    fetchProjects();
  }, []);

  const openDeleteModal = (projectId) => { setProjectToDelete(projectId); setIsModalOpen(true); };
  const closeDeleteModal = () => { setIsModalOpen(false); setProjectToDelete(null); };

  const confirmDelete = async () => {
    try {
      await axios.delete('https://backport-backend.vercel.app/api/deleteproject', {
        data: { projectId: projectToDelete },
      });
      setProjdata((prev) => prev.filter((p) => p._id !== projectToDelete));
      closeDeleteModal();
    } catch {
      alert('Failed to delete project');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-indigo-600 text-white p-2 rounded-lg">
            <MdOutlineFolder className="text-xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Projects</h1>
            <p className="text-sm text-gray-500">{projdata.length} project{projdata.length !== 1 ? 's' : ''} in your portfolio</p>
          </div>
        </div>

        {projdata.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
            <MdOutlineFolder className="text-4xl text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No projects yet. Add your first project!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {projdata.map((project) => (
              <div
                key={project._id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 hover:shadow-sm transition flex flex-col sm:flex-row"
              >
                {/* Image */}
                <div className="sm:w-48 h-40 sm:h-auto flex-shrink-0 bg-gray-100">
                  <img
                    src={project.images?.[0] || '/placeholder-project.jpg'}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 text-lg leading-tight">{project.title}</h3>
                      {user && (
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => navigate(`/show-projects/edit/${project._id}`)}
                            className="p-2 rounded-lg border border-gray-200 hover:bg-indigo-50 hover:border-indigo-200 text-gray-500 hover:text-indigo-600 transition"
                            title="Edit"
                          >
                            <FiEdit2 className="text-sm" />
                          </button>
                          <button
                            onClick={() => openDeleteModal(project._id)}
                            className="p-2 rounded-lg border border-gray-200 hover:bg-red-50 hover:border-red-200 text-gray-500 hover:text-red-500 transition"
                            title="Delete"
                          >
                            <FiTrash2 className="text-sm" />
                          </button>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-500 text-sm line-clamp-2 mb-3">{project.desc}</p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.split(',').map((tag, i) => (
                        <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    {project.githublink && (
                      <a
                        href={project.githublink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition"
                      >
                        <ImGithub /> GitHub
                      </a>
                    )}
                    {project.projlink && (
                      <a
                        href={project.projlink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs border border-indigo-200 text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition"
                      >
                        <TbExternalLink /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete Project"
        className="bg-white rounded-2xl shadow-xl p-8 max-w-sm mx-auto mt-32 outline-none"
        overlayClassName="fixed inset-0 bg-black/40 flex items-start justify-center"
      >
        <div className="flex flex-col items-center text-center gap-4">
          <div className="bg-red-100 text-red-500 p-3 rounded-full">
            <FiTrash2 className="text-xl" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Delete Project?</h2>
            <p className="text-sm text-gray-500 mt-1">This action cannot be undone.</p>
          </div>
          <div className="flex gap-3 w-full mt-2">
            <button
              onClick={closeDeleteModal}
              className="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-lg transition text-sm font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
