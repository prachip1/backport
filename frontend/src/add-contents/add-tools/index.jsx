import React, { useState } from 'react';
import { toolIcons } from '@/toolsIcons';

export default function AddTools() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTools, setSelectedTools] = useState([]);

  // Filter tools based on search term
  const filteredIcons = toolIcons.filter((tool) =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle adding a tool
  const addTool = (tool) => {
    setSelectedTools((prev) => [...prev, tool]);
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-6">Add Your Tools</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search tools..."
        className="border p-2 mb-6 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Render Filtered Icons with Flexbox */}
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

      {/* Display Selected Tools with Flexbox */}
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
    </div>
  );
}
