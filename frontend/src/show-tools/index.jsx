import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { Toaster, toast } from 'react-hot-toast';
import { toolIcons } from '@/toolsIcons';
import { FiTrash2 } from 'react-icons/fi';

export default function ShowTools() {
  const [userTools, setUserTools] = useState([]);
  const { user } = useUser();

  const fetchUserTools = async () => {
    try {
      const response = await axios.get('https://backport-backend.vercel.app/api/gettools');
      setUserTools(response.data);
    } catch {
      toast.error('Error fetching tools.');
    }
  };

  useEffect(() => { fetchUserTools(); }, [user]);

  const goDelete = async (toolId) => {
    try {
      const res = await axios.delete('https://backport-backend.vercel.app/api/deletetool', {
        data: { toolId },
      });
      toast.success(res.data.message);
      fetchUserTools();
    } catch {
      toast.error('Error deleting tool.');
    }
  };

  if (userTools.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400 text-sm">
        <Toaster position="top-right" />
        No tools added yet.
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Toaster position="top-right" />
      {userTools.map((tool) => {
        const toolData = toolIcons.find((icon) => icon.name === tool.toolname);
        return (
          <div
            key={tool._id}
            className="group relative flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border border-gray-200 w-24 bg-white hover:border-gray-300 transition"
          >
            {user && (
              <button
                onClick={() => goDelete(tool._id)}
                className="absolute top-1.5 right-1.5 p-1 rounded-md text-gray-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition"
              >
                <FiTrash2 className="text-xs" />
              </button>
            )}
            <span className="text-3xl">{toolData ? toolData.icon : null}</span>
            <span className="text-xs text-gray-600 text-center leading-tight">{tool.toolname}</span>
          </div>
        );
      })}
    </div>
  );
}
