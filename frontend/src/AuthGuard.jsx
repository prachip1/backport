import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function AuthGuard({ children }) {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn && user.primaryEmailAddress.emailAddress !== 'prachiscoding@gmail.com') {
      // Redirect unauthorized users to a different page or show an error
      navigate('/unauthorized');
    }
  }, [isSignedIn, user, navigate]);

  return isSignedIn && user.primaryEmailAddress.emailAddress === 'prachiscoding@gmail.com' ? children : null;
}
