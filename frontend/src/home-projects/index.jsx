import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiEdit } from "react-icons/fi";
import { AiTwotoneDelete } from "react-icons/ai";
import { ImGithub } from "react-icons/im";
import { TbExternalLink } from "react-icons/tb";
import { useUser } from '@clerk/clerk-react';

export default function HomeProjects({ limit }) {
    const [projects, setProjects] = useState([]);
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:5002/api/showprojects');
                setProjects(response.data.slice(0, limit)); // Only take limited projects
            } catch (error) {
                console.error("Error fetching projects", error);
            }
        };
        fetchProjects();
    }, [limit]);

    return (
        <div className="w-full px-4 mt-12 max-w-6xl">
            <h2 className="text-3xl mb-6 text-center">Recent Projects</h2>
            
            <div className="flex flex-wrap justify-center gap-8">
                {projects.map((project) => (
                    // Your existing project card JSX here
                    // Same as in your ShowProjects component
                        <div className="relative w-[50em] h-[14em] rounded-2xl shadow-xl/30 overflow-hidden text-gray-950 border border-gray-300 mb-8">
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
                                  <div className="flex h-full">
                                    {/* Image Section */}
                                    <div className="w-[40%] h-full border-r border-gray-300 overflow-hidden">
                                      <img
                                        src={project.images?.[0] || '/placeholder-project.jpg'} 
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                
                                    {/* Text Content */}
                                    <div className="w-full md:w-2/3 p-6">
                                      <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                                      <p className="text-gray-800 mb-4">{project.desc}</p>
                                
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
                                            <span className="text-xs bg-green-400/50 text-green-700   px-3 py-1 rounded-full cursor-pointer"><a herf={project.githublink} target="_blank">
                                                                 <ImGithub/> </a></span>
                                          <span className="text-xs bg-pink-400/50 text-pink-700 px-3 py-1 rounded-full cursor-pointer">
                                          <a href={project.projlink} target='_blank'><TbExternalLink /></a></span>
                                         {/** <span className="text-xs  bg-indigo-500/20 text-indigo-200  px-3 py-1 rounded-full">AI-Powered</span> */}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                ))}
            </div>
            
            {/* View More Button */}
            <div className="text-center mt-8">
                <button 
                    onClick={() => navigate('/show-projects')}
                    className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                    View All Projects
                </button>
            </div>
        </div>
    );
}