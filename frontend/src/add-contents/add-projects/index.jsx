import React, { useState } from 'react'

export default function AddProjects() {
const[addProjData, setaddProjData] = useState([])

const uploadProj=()=>{
  
}

  return (
    <div className='flex flex-col justify-center items-center'>
      <h2>Add Projects</h2>
      <div className='mt-8'>


        <form className='flex flex-col gap-4' onSubmit={uploadProj}>
       <input type="text" placeholder='add title' className='p-2 border border-indigo-900 rounded' />
       <input type="file" placeholder='add image' />
      <input type="text" placeholder='add tags' className='p-2 border border-indigo-900 rounded'  />
      <input type="description" placeholder='add description' className='p-2 border border-indigo-900 rounded'  />
      <input type="buttontext" placeholder='add button text' className='p-2 border border-indigo-900 rounded'  />

      <button className='bg-indigo-900 text-gray-200 p-4'>Add project</button>
        </form>
   
      </div>
  
    </div>
  )
}
