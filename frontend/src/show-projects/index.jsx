import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useUser } from '@clerk/clerk-react';
import ProjectCarousel from './ProjectCarousel';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root'); // Bind modal to your root div to improve accessibility

export default function ShowProjects() {
  const [projdata, setProjdata] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await axios.get('https://backport-backend.vercel.app/api/showprojects');
        setProjdata(response.data);
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };

    getProjects();
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
      // Remove the deleted project from the UI
      setProjdata(prevData => prevData.filter(project => project._id !== projectToDelete));
      closeDeleteModal();
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project');
    }
  };

  const editData = (projectId) => {
    navigate(`/show-projects/edit/${projectId}`);  // Navigate to edit page with project ID
  };

  return (
    <div className='flex w-full justify-center items-center'>
      <div className="flex flex-col justify-center items-center gap-8">
        <div className="flex flex-col lg:flex-row justify-center items-center">
          <h2 className="text-3xl">My Recent Works.</h2>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {projdata.length > 0 ? (
            projdata.map((project, index) => (
              <div 
                key={index} 
                className="relative flex flex-col justify-center items-center 
                lg:justify-normal lg:items-start gap-6 w-screen lg:w-[48%] bg-base-300 p-18 lg:p-8 
                rounded-md shadow-xl border-2 border-bg-gray-900">
                {/* Edit and Delete Buttons positioned in top-right corner, only shown if user is logged in */}
                {user && (
                  <div className='absolute top-2 right-4 flex gap-2'>
                    <p 
                      onClick={() => editData(project._id)} 
                      className='cursor-pointer p-1 text-slate-500 text-sm font-semibold  hover:text-slate-800'
                    >
                      Edit
                    </p>
                    <p 
                      onClick={() => openDeleteModal(project._id)} 
                      className='cursor-pointer p-1  text-red-600 text-sm font-semibold  hover:text-red-400'
                    >
                      Delete
                    </p>
                  </div>
                )}

                {/* Project Carousel */}
                {project.images && project.images.length > 0 && (
                  <ProjectCarousel images={project.images} title={project.title} />
                )}

                {/* Project Details */}
                <div className="flex flex-col gap-2 w-full mt-18 h-full">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="text-sm font-light bg-slate-900 text-slate-400 p-1 rounded-lg">{project.tags}</p>
                  <p className='text-lg'>{project.desc}</p>
                </div>

                {/* Visit Website Button */}
                <div className="flex justify-center items-center gap-8 mt-2 mb-8 lg:mb-0">
                  <a href={project.projlink} target="_blank" rel="noopener noreferrer">
                    <button className="btn bg-gray-800 text-gray-200 rounded tracking-tighter p-2 hover:bg-slate-900 hover:text-slate-200">
                      Visit Website
                    </button>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p>No projects found</p>
          )}
        </div>
      </div>

      {/* Delete confirmation modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete Confirmation"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          content: {
            position: 'relative',
            width: '400px',
            padding: '20px',
            inset: 'unset', // Remove default positioning
            borderRadius: '8px',
            backgroundColor: '#fff', // Or any preferred background color
          },
        }}
      >
        <p className='mt-4'>Are you sure you want to delete this project?</p>
        <div className='flex gap-4 mt-4'>
          <button onClick={confirmDelete} className="btn bg-red-500 text-white p-2 rounded">Yes, Delete</button>
          <button onClick={closeDeleteModal} className="btn bg-gray-500 text-white p-2 rounded">Cancel</button>
        </div>
      </Modal>
    </div>
  );
}
