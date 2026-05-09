import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFolder, FiTool, FiArrowRight } from 'react-icons/fi';
import { MdOutlineEditNote } from 'react-icons/md';

const options = [
  {
    icon: <FiFolder className="text-xl" />,
    label: 'Update / Delete Projects',
    route: '/show-projects',
    color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
  },
  {
    icon: <FiTool className="text-xl" />,
    label: 'Update / Delete Tools',
    route: '/add-tools',
    color: 'bg-violet-50 text-violet-600 border-violet-100',
  },
]

export default function UpdateData() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gray-800 text-white p-2 rounded-lg">
            <MdOutlineEditNote className="text-2xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Update Content</h1>
            <p className="text-sm text-gray-500">Edit or remove existing portfolio content</p>
          </div>
        </div>

        <div className="grid gap-4">
          {options.map((opt) => (
            <button
              key={opt.route}
              onClick={() => navigate(opt.route)}
              className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:shadow-sm transition-all group text-left"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg border ${opt.color}`}>
                  {opt.icon}
                </div>
                <p className="font-semibold text-gray-900">{opt.label}</p>
              </div>
              <FiArrowRight className="text-gray-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
