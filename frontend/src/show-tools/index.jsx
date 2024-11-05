import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { Toaster, toast } from 'react-hot-toast';
import { toolIcons } from '@/toolsIcons';
import { useNavigate } from 'react-router-dom';

export default function ShowTools() {
  const [userTools, setUserTools] = useState([]);
  const { user } = useUser(); // Get the logged-in user
  const navigate = useNavigate();

  // Fetch user's tools from the database
  const fetchUserTools = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/gettools');
      setUserTools(response.data);
    } catch (error) {
      console.error('Error fetching user tools:', error);
      toast.error('Error fetching tools.');
    }
  };

  // Call fetchUserTools on component mount
  useEffect(() => {
    fetchUserTools();
  }, [user]);

  const goDelete = async (toolId) => {
    try {
      const res = await axios.delete('http://localhost:5000/api/deletetool', {
        data: { toolId },
      });
      toast.success(res.data.message);
      // Refetch the tools to update the UI after deletion
      fetchUserTools();
    } catch (error) {
      console.error('Error deleting tool:', error);
      toast.error('Error deleting tool.');
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-8 mb-14">
        <h2 className="text-3xl">Tools I use.</h2>
        <Toaster />
        <div className="flex flex-col lg:flex-row justify-center items-center lg:mt-20 gap-8">
          {userTools.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {userTools.map((tool) => {
                const toolData = toolIcons.find((icon) => icon.name === tool.toolname);

                return (
                  <div key={tool._id} className="p-4 rounded-lg text-center flex flex-col items-center justify-center w-32">
                    {user && (
                      <p
                        className="text-sm font-semibold text-red-600 hover:text-red-400 cursor-pointer"
                        onClick={() => goDelete(tool._id)}
                      >
                        Delete
                      </p>
                    )}
                    <div className="text-8xl">
                      {toolData ? toolData.icon : null}
                    </div>
                    <p className="mt-2 text-base">{tool.toolname}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>No tools added yet.</p>
          )}
        
        </div>
      </div>
    </div>
  );
}
