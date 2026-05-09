import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectCarousel from './ProjectCarousel';
import { FiSave, FiArrowLeft } from 'react-icons/fi';
import { toast, Toaster } from 'react-hot-toast';

export default function EditProject() {
  const [project, setProject] = useState(null);
  const { projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`https://backport-backend.vercel.app/api/showprojects/${projectId}`);
        setProject(response.data);
      } catch {
        toast.error('Failed to load project.');
      }
    };
    fetchProject();
  }, [projectId]);

  const handleUpdate = async () => {
    try {
      await axios.put(`https://backport-backend.vercel.app/api/showprojects/${projectId}`, project);
      toast.success('Project updated!');
      setTimeout(() => navigate('/show-projects'), 1000);
    } catch {
      toast.error('Failed to update project.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <span className="w-8 h-8 border-2 border-gray-300 border-t-indigo-500 rounded-full animate-spin" />
          <p className="text-sm">Loading project...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <Toaster position="top-right" />
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate('/show-projects')}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-600 transition"
          >
            <FiArrowLeft />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Edit Project</h1>
            <p className="text-sm text-gray-500">{project.title}</p>
          </div>
        </div>

        {/* Image Carousel */}
        {project.images && project.images.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-6">
            <ProjectCarousel images={project.images} title={project.title} />
          </div>
        )}

        {/* Edit Form */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea
              name="desc"
              value={project.desc}
              onChange={handleInputChange}
              rows={5}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags</label>
            <input
              type="text"
              name="tags"
              value={project.tags}
              onChange={handleInputChange}
              placeholder="e.g. React, Node.js"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
            <p className="text-xs text-gray-400 mt-1">Separate tags with commas</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Live Project URL</label>
            <input
              type="url"
              name="projlink"
              value={project.projlink}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">GitHub URL</label>
            <input
              type="url"
              name="githublink"
              value={project.githublink || ''}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>

          <button
            onClick={handleUpdate}
            className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
          >
            <FiSave />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
