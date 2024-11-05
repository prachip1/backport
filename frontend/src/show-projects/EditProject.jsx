// EditProject.jsx

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectCarousel from './ProjectCarousel';

export default function EditProject() {
  const [project, setProject] = useState(null);
  const { projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`https://backport-backend.vercel.app/api/showprojects/${projectId}`);
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`https://backport-backend.vercel.app/api/showprojects/${projectId}`, project);
      alert(response.data.message);
      navigate('/show-projects'); // Redirect back to the projects page
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Failed to update project');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  if (!project) {
    return <p>Loading project...</p>;
  }

  return (
    <div className="flex flex-col items-center w-full p-4 lg:p-8">
      {/* Carousel */}
      <div className="w-full max-w-4xl mb-8">
      <h2 className="text-4xl font-bold mb-4">{project.title}</h2>
        {project.images && project.images.length > 0 && (
          <ProjectCarousel images={project.images} title={project.title} className="h-full w-full" />
        )}
      </div>

      {/* Project Details */}
      <div className="flex flex-col justify-center w-full gap-8 mt-20">
       
        
        <div className="flex justify-center items-center mt-8 gap-8">
          <label className="text-lg font-semibold">Description:</label>
          <textarea
            name="desc"
            value={project.desc}
            onChange={handleInputChange}
            className="textarea textarea-bordered w-full h-32 border border-gray-600 rounded-md"
          ></textarea>
        </div>
        
        <div className="flex justify-center items-center mt-8 gap-8">
          <label className="text-lg font-semibold">Tags</label>
          <input
            type="text"
            name="tags"
            value={project.tags}
            onChange={handleInputChange}
            className="input input-bordered w-full mt-2"
          />
        </div>
        
        <div className="flex justify-center items-center mt-8 gap-8">
          <label className="text-lg font-semibold">Link</label>
          <input
            type="url"
            name="projlink"
            value={project.projlink}
            onChange={handleInputChange}
            className="input input-bordered w-full mt-2"
          />
        </div>

        {/* Update Button */}
        <div className="flex justify-center mt-8">
          <button onClick={handleUpdate} className="btn bg-gray-800 text-white px-6 py-2 rounded-md">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
