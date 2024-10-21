import { useState, useEffect } from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
import ShowHeader from './show-header';
import ShowProjects from './show-projects';
import ShowTools from './show-tools';
import AddContents from './add-contents';


export default function Home() {
    const { isSignedIn } = useAuth(); // Get the sign-in status from Clerk
    const navigate = useNavigate();
  
  
  return (
    <div className='flex flex-col justify-center items-center mt-14 gap-28'>
     {/*All components will be displayed here*/}
    
     {/*header*/}
     <ShowHeader />
     {/*projectes*/}
     <ShowProjects />
      {/*tools i use */}
      <ShowTools />
    </div>
  )
}
