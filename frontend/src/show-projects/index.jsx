import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

import { FiEdit } from "react-icons/fi";
import { AiTwotoneDelete } from "react-icons/ai";
import { ImGithub } from "react-icons/im";
import { TbExternalLink } from "react-icons/tb";
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
        console.log(response.data);
        setProjdata(response.data);
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };

    fetchProjects();
  }, []);

  const openDeleteModal = (projectId) => {
    setProjectToDelete(projectId);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setProjectToDelete(null);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete('https://backport-backend.vercel.app/api/deleteproject', {
        data: { projectId: projectToDelete },
      });
      alert(response.data.message);
      setProjdata(prevData => prevData.filter(project => project._id !== projectToDelete));
      closeDeleteModal();
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project');
    }
  };

  const editData = (projectId) => {
    navigate(`/show-projects/edit/${projectId}`);
  };

  return (
    <div className="flex flex-col items-center w-full">
      
      {/* ✅ Top: Image Slider */}
      
       {/**  <div className="w-full">
          <ProjectSlider  />
        </div>*/}
    

      {/* 🔽 Recent Projects section */}
      <div className="w-full px-4 mt-12 max-w-6xl">
        <h2 className="text-3xl mb-6 text-center">Recent Projects</h2>

        <div className="flex flex-wrap flex-col justify-center items-center gap-8">
          {projdata.length > 0 ? (
            projdata.map((project, index) => (
              <div className="relative lg:w-[50em] lg:h-[14em] shadow-inner rounded-2xl shadow-xl/30 overflow-hidden text-gray-950 border border-gray-300 mb-8">
              {/* Admin Controls */}
              {user && (
                <div className='absolute top-2 right-2 z-10 flex gap-2 bg-white/10 p-1 rounded'>
                  <button 
                    onClick={() => editData(project._id)} 
                    className='text-xs bg-gray-800 text-white px-2 py-1 rounded hover:bg-bg-gray-700'
                  >
                    <FiEdit className='text-lg' /> 
                  </button>
                  <button 
                    onClick={() => openDeleteModal(project._id)} 
                    className='text-xs bg-gray-800 text-white px-2 py-1 rounded hover:bg-bg-gray-700'
                  >
                    <AiTwotoneDelete className='text-lg' />
                  </button>
                </div>
              )}
            
              {/* Card Content */}
              <div className="flex flex-col lg:flex-row h-full">
                {/* Image Section */}
                <div className="lg:w-[40%] h-full border-r border-gray-300 overflow-hidden">
                  <img
                    src={project.images?.[0] || '/placeholder-project.jpg'} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
            
                {/* Text Content */}
                <div className="w-full md:w-2/3 p-6">
                  <h3 className="lg:text-2xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-800 mb-4 text-sm lg:text-lg">{project.desc}</p>
            
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.split(',').map((tag, index) => (
                      <span 
                        key={index} 
                        className="text-xs bg-gray-300 text-gray-700 px-3 py-1 rounded-full border border-white/20"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
            
                  {/* Links */}
                  <div>
                  {/**  <h4 className="text-sm font-semibold text-gray-400 mb-2">Features</h4> */} 
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-green-400/50 text-green-700 px-3 py-1 rounded-full cursor-pointer">
                      <a href={project.githublink} target="_blank" rel="noopener noreferrer"><ImGithub/> </a></span>
                      <span className="text-xs bg-pink-400/50 text-pink-700 px-3 py-1 rounded-full cursor-pointer">
                      <a href={project.projlink} target='_blank' rel="noopener noreferrer"><TbExternalLink /></a></span>
                     {/** <span className="text-xs  bg-indigo-500/20 text-indigo-200  px-3 py-1 rounded-full">AI-Powered</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            
              
            ))
          ) : (
            <p>No projects found</p>
          )}
        </div>
      </div>

      {/* 🧼 Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete Project"
        className="bg-white p-8 rounded shadow-md max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
        <p>Are you sure you want to delete this project?</p>
        <div className="flex justify-end mt-6 gap-4">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={closeDeleteModal}>Cancel</button>
          <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={confirmDelete}>Delete</button>
        </div>
      </Modal>
    </div>
  );
}
