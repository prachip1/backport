import React from 'react'
import AddProjects from './add-projects'
import AddTools from './add-tools'
import { useNavigate } from 'react-router-dom'

export default function AddContents() {
const navigate = useNavigate()

  const addingProjects=()=>{
    navigate('/add-projects')
  }

  const addingTools=()=>{
    navigate('/add-tools')
  }
  return (
    <div className="flex flex-col p-8 m-8 gap-8">
      <div className='mb-8'>
      <h2 className='text-xl font-mono font-bold'>Hey here you can add contents to your portfolio</h2>
      </div>
      
      {/*add projects */}
      <button className='border-2 border-indigo-900 p-6 w-44 rounded-lg text-gray-800
       hover:bg-indigo-200 font-semibold' 
      onClick={addingProjects}>Add Projects</button>
     
      {/*add tools*/}
      <button className='border-2 border-indigo-900 p-6 w-44 rounded-lg text-gray-800
       hover:bg-indigo-200 font-semibold' 
      onClick={addingTools}>Add Tools</button>
      
    </div>
  )
}
