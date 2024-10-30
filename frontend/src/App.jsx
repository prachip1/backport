import { useState, useEffect } from 'react';
import './App.css';
import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from "@clerk/clerk-react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import ConnectWebsite from './connect-website';
import AddContents from './add-contents';
import Home from './Home';
import { Toaster } from 'react-hot-toast';
import AddProjects from './add-contents/add-projects';
import AddTools from './add-contents/add-tools';
import YourApiKeys from './your-api-keys';
import Authenticate from './autheticate';
import UpdateData from './updates';
import ShowProjects from './show-projects';
import EditProject from './show-projects/EditProject';
import ProjectCarousel from './show-projects/ProjectCarousel';

function App() {
  const { isSignedIn } = useAuth(); // Get the sign-in status from Clerk
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  useEffect(() => {
    // Only redirect to /connect-website if the user is signed in AND currently on the root path or home page
    if (isSignedIn && location.pathname === '/') {
      navigate('/');
    }
  }, [isSignedIn, navigate, location.pathname]); // Check the path every time it changes

  return (
    <div className='flex flex-col justify-center items-center '>
      
      <Toaster />
   <Authenticate />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authenticate" element={<Authenticate />} />
        
        <Route path="/connect-website" element={<ConnectWebsite />} />
        <Route path="/add-contents" element={<AddContents />} />
        <Route path="/add-projects" element={<AddProjects />} />
        <Route path="/show-projects" element={<ShowProjects />} />
        <Route path="/show-projects/edit/:projectId" element={<EditProject />} />
        <Route path="/project-car" element={<ProjectCarousel />} />
        <Route path="/add-tools" element={<AddTools />} />
        <Route path='/your-api-keys' element={<YourApiKeys />} />
        <Route path='/updates' element={<UpdateData />} />
      </Routes>
    </div>
  );
}

export default App;
