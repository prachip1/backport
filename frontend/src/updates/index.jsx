import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function UpdateData() {
 const navigate= useNavigate();

 const updateProjects=()=>{
  navigate('/show-projects')
 }

  return (
    <div className='flex flex-col gap-8'>
      <h2>Here you will update data</h2> 
      {/*update projects */}
      <button onClick={updateProjects} className='bg-indigo-900 text-gray-200 p-2 rounded hover:bg-indigo-700'>Update/Delete Projects</button>
         {/*edit projects*/}
         {/*delete projects*/}
        

       {/*update tools*/}
       <button className='bg-indigo-900 text-gray-200 p-2 rounded hover:bg-indigo-700'>Update/Delete Tools</button>
          {/*edit tools*/}
          {/*delete tools*/}
    </div>
  )
}
