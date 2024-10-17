import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ConnectWebsite() {
  const [linkData, setLinkData] = useState(""); // State for website link
  const [email, setEmail] = useState(""); // State for email input

  const navigate = useNavigate();

  const addingWeb = (e) => {
    e.preventDefault(); // Prevent default form behavior

    // Validate both linkData and email inputs
    if (!linkData) {
      toast.error("Please enter a valid website link");
      return;
    }

    if (!email) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Log the data for debugging
    console.log("Website link:", linkData);
    console.log("Email:", email);

    // Show a success toast
    toast.success('Successfully submitted!');

    // Navigate to the add-contents page after successful submission
    navigate('/add-contents');

    // Reset the input fields
    setLinkData("");
    setEmail("");
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
            onChange={(e) => setLinkData(e.target.value)}
            value={linkData}
            type='text'
            placeholder='http://www.abc.com'
            className='bg-indigo-200 border-0 w-full rounded-sm py-4 px-2'
          />
          
          {/* Email input */}
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
    </div>
  );
}
