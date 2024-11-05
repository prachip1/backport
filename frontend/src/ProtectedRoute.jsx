import { Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

function ProtectedRoute({ children }) {
  const { user, isSignedIn } = useUser();

  // Check if the user is signed in and has the authorized email
  if (!isSignedIn || user.primaryEmailAddress.emailAddress !== 'prachiscoding@gmail.com') {
    // Redirect unauthorized users or not signed-in users
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
