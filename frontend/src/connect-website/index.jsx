import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';

export default function ConnectWebsite() {
  const { user } = useUser();
  const [website, setWebsite]= useState('');
  const [userEmail,setUserEmail] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');


  const navigate = useNavigate();

  const addingWeb = async(e) => {
    e.preventDefault(); // Prevent default form behavior
    setError('');
    setApiKey(''); // Reset the API key
    if(!website){
      setError('Pleasss');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/generate-api-key', {
        clerkUserId: user.id,
        website
      });

      console.log('API response:', response.data); // Log the API response for debugging

      if (response.data.apiKey) {
      setApiKey(response.data.apiKey); // Set the API key in the state
      toast.success('Successfully submitted!');

      // Navigate after a short delay to ensure the API key is generated
      setTimeout(() => {
        navigate('/add-contents');
      }, 1000);
    } else {
      setError('Failed to generate API key. Please try again.');
    }
    } catch (error) {
      console.error('Error connecting website:', error);
      setError('Failed to connect website. Please try again.');
    }
    // Log the data for debugging
  //  console.log("Website link:", linkData);
   // console.log("Email:", email);

    // Show a success toast
    toast.success('Successfully submitted!');

    // Navigate to the add-contents page after successful submission
    navigate('/add-contents');

    // Reset the input fields
   // setLinkData("");
    //setEmail("");
  };

  return (
    <div className='flex flex-col justify-center items-center mt-28 w-screen'>
      <Toaster />
      <div className='pb-8'>
        <h2 className='text-black text-2xl tracking-tighter font-mono font-semibold'>Please link your website</h2>
      </div>
      <div className='flex justify-center items-center p-24'>
        <form className='flex flex-col font-mono gap-8' onSubmit={addingWeb}>
          {/* Website link input */}
          <input
            onChange={(e) => setWebsite(e.target.value)}
            value={website}
            type='url'
            placeholder='http://www.abc.com'
            className='bg-indigo-200 border-0 w-full rounded-sm py-4 px-2'
            required
          />
          
          {/* Email input */}
          <input
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
            type='email'
            placeholder='Please enter your email id'
            className='bg-indigo-200 border-0 w-full rounded-sm py-4 px-2'
          />

          {/* Submit button */}
          <button
            type="submit"
            className='bg-indigo-900 p-[10px] rounded-lg text-gray-200 hover:bg-indigo-950 hover:scale-100 hover:animate-pulse'>
            Submit
          </button>
        </form>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {apiKey && (
        <div>
          <h2>Your API Key</h2>
          <p>{apiKey}</p>
          <p>Use this API key to make requests to your portfolio CMS.</p>
        </div>
      )}
    </div>
  );
}
