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
    <div className='flex justify-between gap-8'>

      
      <div className='flex justify-center items-center gap-4'>
        <h2>Prachi</h2>
        {isSignedIn&&<button onClick={addContent}>Add Contents</button>}
        
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
