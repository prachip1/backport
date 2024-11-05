import React, { useState } from 'react';
import { toolIcons } from '@/toolsIcons';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import ShowTools from '@/show-tools';

export default function AddTools() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTools, setSelectedTools] = useState([]);
  const { user } = useUser();

  // Filter tools based on search term
  const filteredIcons = toolIcons.filter((tool) =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle adding a tool to the selectedTools array
  const addTool = (tool) => {
    if (!selectedTools.find((t) => t.name === tool.name)) {
      setSelectedTools((prev) => [...prev, tool]);
    }
  };

  // Function to send selected tools to the backend
  const addingTools = async () => {
    const toolsData = selectedTools.map((tool) => ({
      toolname: tool.name,
      clerkUserId: user.id,
    }));

    try {
      const response = await axios.post('http://localhost:5000/api/addtool', {
        tools: toolsData,
      });
      console.log('Tools added:', response.data);
      toast.success('Tools added successfully');
      setSelectedTools([]); // Clear selected tools after successful upload
    } catch (error) {
      console.error('Error adding tools:', error);
      toast.error('Error adding tools.');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-6">Add Your Tools</h2>
      <Toaster />

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search tools..."
        className="border p-2 mb-6 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Render Filtered Icons */}
      <div className="flex flex-wrap gap-4 mb-8">
        {filteredIcons.map((tool, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg text-center cursor-pointer hover:bg-gray-200 flex flex-col items-center justify-center w-32"
            onClick={() => addTool(tool)}
          >
            <div className="text-3xl">{tool.icon}</div>
            <p className="mt-2">{tool.name}</p>
          </div>
        ))}
      </div>

      {/* Display Selected Tools */}
      {selectedTools.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">Selected Tools:</h3>
          <div className="flex flex-wrap gap-4">
            {selectedTools.map((tool, index) => (
              <div key={index} className="border p-4 rounded-lg text-center flex flex-col items-center justify-center w-32">
                <div className="text-3xl">{tool.icon}</div>
                <p className="mt-2">{tool.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <button className="bg-indigo-900 text-white p-2 rounded-md" onClick={addingTools}>
        Add them
      </button>

      <ShowTools />
    </div>
  );
}
