import React, { useState } from 'react';
import { toolIcons } from '@/toolsIcons';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import ShowTools from '@/show-tools';
import { FiSearch, FiTool, FiCheck } from 'react-icons/fi';

export default function AddTools() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTools, setSelectedTools] = useState([]);
  const { user } = useUser();

  const filteredIcons = toolIcons.filter((tool) =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleTool = (tool) => {
    if (selectedTools.find((t) => t.name === tool.name)) {
      setSelectedTools((prev) => prev.filter((t) => t.name !== tool.name));
    } else {
      setSelectedTools((prev) => [...prev, tool]);
    }
  };

  const addingTools = async () => {
    if (selectedTools.length === 0) { toast.error('Select at least one tool.'); return; }
    const toolsData = selectedTools.map((tool) => ({ toolname: tool.name, clerkUserId: user.id }));
    try {
      await axios.post('https://backport-backend.vercel.app/api/addtool', { tools: toolsData });
      toast.success('Tools added successfully!');
      setSelectedTools([]);
    } catch {
      toast.error('Error adding tools.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-violet-600 text-white p-2 rounded-lg">
            <FiTool className="text-xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Add Tools</h1>
            <p className="text-sm text-gray-500">Select the tools and technologies you work with</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          {/* Search */}
          <div className="relative mb-6">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
            />
          </div>

          {/* Tool Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 max-h-80 overflow-y-auto pr-1">
            {filteredIcons.map((tool, index) => {
              const isSelected = !!selectedTools.find((t) => t.name === tool.name);
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => toggleTool(tool)}
                  className={`relative flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border-2 transition cursor-pointer text-center ${
                    isSelected
                      ? 'border-violet-500 bg-violet-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 bg-violet-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                      <FiCheck className="text-xs" />
                    </div>
                  )}
                  <span className="text-2xl">{tool.icon}</span>
                  <span className="text-xs text-gray-600 leading-tight">{tool.name}</span>
                </button>
              );
            })}
          </div>

          {filteredIcons.length === 0 && (
            <p className="text-center text-gray-400 py-8 text-sm">No tools match your search</p>
          )}

          {/* Selected Summary & Submit */}
          <div className="mt-6 flex items-center justify-between gap-4 border-t border-gray-100 pt-5">
            <p className="text-sm text-gray-500">
              {selectedTools.length > 0
                ? <><span className="font-semibold text-violet-600">{selectedTools.length}</span> tool{selectedTools.length > 1 ? 's' : ''} selected</>
                : 'No tools selected yet'}
            </p>
            <button
              onClick={addingTools}
              disabled={selectedTools.length === 0}
              className="bg-violet-600 hover:bg-violet-700 disabled:bg-violet-200 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-lg transition text-sm"
            >
              Save Tools
            </button>
          </div>
        </div>

        {/* Current tools section */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Current Tools</h2>
          <ShowTools />
        </div>
      </div>
    </div>
  );
}
