import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import ProjectCarousel from './ProjectCarousel';
import { useNavigate } from 'react-router-dom';

export default function ShowProjects() {
  const [projdata, setProjdata] = useState([]);
  const { user } = useUser();  // Clerk authentication

  const navigate = useNavigate();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/showprojects', {
          params: {
            clerkUserId: user.id, // Assuming Clerk provides the user ID as user.id
          },
        });
        console.log("Fetched project data:", response.data); // Log here to confirm data fetching
        setProjdata(response.data);
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };
    

    if (user) {
      getProjects();
    }
  }, [user]);


  const goUpdate=()=>{
    navigate('/updates')
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-8">
        <div className="flex flex-col lg:flex-row justify-center items-center">
          <h2 className="text-3xl">My Recent Works.</h2>
         
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center lg:justify-normal gap-6 p-8">
        
          {projdata.length > 0 ? (
            projdata.map((project, index) => (
              <div key={index} className="flex flex-col justify-center items-center lg:justify-normal lg:items-start gap-6 w-screen lg:w-full 
                bg-base-300 p-4 lg:p-8 rounded-md shadow-xl border-2 border-bg-gray-900">
                {/* Image */}
                {project.images && project.images.length > 0 && (
                  <ProjectCarousel images={project.images} title={project.title} />

                )}
                <div className="flex flex-col gap-2 w-full pl-2 pr-2">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="text-sm font-light bg-slate-900 text-slate-400 p-1 rounded-lg">{project.tags}</p>
                  <p className='text-lg'>{project.desc}</p>
                </div>
                <div className="flex gap-8 mt-4 pl-2 pr-2">
                  <a href={project.projlink} target="_blank" rel="noopener noreferrer">
                    <button className="btn bg-gray-800 text-gray-200 rounded tracking-tighter p-2  hover:bg-slate-900 hover:text-slate-200">
                      Visit Website
                    </button>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p>No projects found</p>
          )}

          {user && <button className='bg-gray-200 p-2 rounded border-2 border-gray-300' onClick={goUpdate}>Update</button> }
          
        </div>

        <div className="flex justify-center mt-6">
          <button className="btn bg-gray-900 text-gray-300 py-4 w-48 rounded-md font-normal tracking-tighter text-base">
            <a href="https://github.com/prachip1" target="_blank">Check more on GitHub.</a>
          </button>
        </div>
      </div>
    </div>
  );
}
