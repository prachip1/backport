import { useState, useEffect } from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
import ShowHeader from './show-header';
import ShowProjects from './show-projects';
import ShowTools from './show-tools';
import AddContents from './add-contents';
import Authenticate from './autheticate';
import Footer from './footer';


export default function Home() {
    const { isSignedIn } = useAuth(); // Get the sign-in status from Clerk
    const navigate = useNavigate();
  
  
  return (
    <div data-theme="black" className='font-display flex flex-col justify-center items-center gap-20'>
     {/*All components will be displayed here*/}
  <Authenticate />
     {/*header*/}
     <ShowHeader />
     {/*projectes*/}
     <ShowProjects />
      {/*tools i use */}
      <ShowTools />

      <Footer />
    </div>
  )
}
