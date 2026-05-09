import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FiFolder, FiTool, FiKey, FiArrowRight } from 'react-icons/fi'
import { MdOutlineDashboardCustomize } from 'react-icons/md'

const cards = [
  {
    icon: <FiFolder className="text-2xl" />,
    title: 'Add Projects',
    desc: 'Upload new projects with images, links, and tags.',
    route: '/add-projects',
    color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
  },
  {
    icon: <FiTool className="text-2xl" />,
    title: 'Add Tools',
    desc: 'Select and save the tech stack you work with.',
    route: '/add-tools',
    color: 'bg-violet-50 text-violet-600 border-violet-100',
  },
  {
    icon: <FiKey className="text-2xl" />,
    title: 'Your API Keys',
    desc: 'View and copy your generated API keys.',
    route: '/your-api-keys',
    color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  },
]

export default function AddContents() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 flex items-center gap-3">
          <div className="bg-indigo-600 text-white p-2 rounded-lg">
            <MdOutlineDashboardCustomize className="text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Content Dashboard</h1>
            <p className="text-gray-500 text-sm mt-0.5">Manage your portfolio content from here</p>
          </div>
        </div>

        <div className="grid gap-4">
          {cards.map((card) => (
            <button
              key={card.route}
              onClick={() => navigate(card.route)}
              className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-sm transition-all group text-left"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg border ${card.color}`}>
                  {card.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{card.title}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{card.desc}</p>
                </div>
              </div>
              <FiArrowRight className="text-gray-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
