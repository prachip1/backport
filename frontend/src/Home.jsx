import { useState, useEffect } from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';


export default function Home() {
    const { isSignedIn } = useAuth(); // Get the sign-in status from Clerk
    const navigate = useNavigate();
  
    useEffect(() => {
      // If the user is signed in, redirect them to /connect-website
      if (isSignedIn) {
        navigate('/connect-website');
      }
    }, [isSignedIn, navigate]);
  return (
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
  )
}
