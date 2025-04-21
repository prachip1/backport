import React from 'react';
import { SignIn } from "@clerk/clerk-react";

export default function Admin() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignIn fallbackRedirectUrl="/"  // This will redirect to home after successful sign-in
      />
    </div>
  );
}