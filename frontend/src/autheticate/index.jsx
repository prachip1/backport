import React, { useEffect } from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';

export default function Authenticate() {
  const { isSignedIn } = useAuth();


  const navigate=useNavigate()

const addContent=()=>{
  navigate('/add-contents')
}



  return (
    <div className='flex justify-between w-full p-8'>

      
      <div className='flex gap-8'>
        <button onClick={()=>navigate('/')} className='font-semibold'>PRACHI.</button>
        {isSignedIn&&<button onClick={addContent} className='bg-gray-600 p-2 rounded text-gray-200'>Add Contents</button>}
        
      </div>
      <div>
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      </div>
    
    </div>
  )
}
