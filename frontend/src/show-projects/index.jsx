import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import ProjectCarousel from './ProjectCarousel';

export default function ShowProjects() {
  const [projdata, setProjdata] = useState([]);
  const { user } = useUser();  // Clerk authentication

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/showprojects', {
          params: {
            clerkUserId: user.id // Assuming Clerk provides the user ID as user.id
          }
        });
        setProjdata(response.data);
        console.log(projdata)
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };

    if (user) {
      getProjects();
    }
  }, [user]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-8">
        <div className="flex flex-col lg:flex-row justify-center items-center">
          <h2 className="text-3xl">My Recent Works.</h2>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-6 p-8">
          {projdata.length > 0 ? (
            projdata.map((project, index) => (
              <div key={index} className="flex flex-col justify-center items-center lg:justify-normal lg:items-start gap-6 w-screen lg:w-full 
                bg-base-300 p-4 lg:p-8 rounded-md shadow-xl">
                {/* Image */}
                {project.images && project.images.length > 0 && (
                  <ProjectCarousel images={project.images} title={project.title} />

                )}
                <div className="flex flex-col gap-2 w-full pl-2 pr-2">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="text-xs font-light bg-slate-900 text-slate-400 p-1 rounded-lg">{project.tags}</p>
                  <p>{project.desc}</p>
                </div>
                <div className="flex gap-8 mt-4 pl-2 pr-2">
                  <a href={project.projlink} target="_blank" rel="noopener noreferrer">
                    <button className="btn bg-white text-base-300 tracking-tighter hover:bg-slate-900 hover:text-slate-200">
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

        <div className="flex justify-center mt-6">
          <button className="btn bg-gray-900 text-gray-300 py-4 w-48 rounded-md font-normal tracking-tighter text-base">
            <a href="https://github.com/prachip1" target="_blank">Check more on GitHub.</a>
          </button>
        </div>
      </div>
    </div>
  );
}
