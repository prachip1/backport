import React, { useState } from 'react';
import { storage } from '@/config/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/clerk-react';

export default function AddSliderimage() {
  const [image, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');

  const { user } = useUser(); // Use Clerk's hook to get the logged-in user
  
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `slider/${uuidv4()}`);
    setUploading(true);

    try {
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      setImageUrl(url);
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!image || !title) {
      toast.error('Please provide title and image.');
      return;
    }
  
    const data = {
      title,
      image,
      clerkUserId: user.id,
    };
  
    try {
      const response = await axios.post('http://localhost:5002/api/addsliderimage', data);
      
      if (response.data.success) {
        toast.success('Slider image added!');
        setImageUrl('');
        setTitle('');
      } else {
        toast.error(response.data.error || 'Failed to save image.');
      }
    } catch (error) {
      console.error('Error saving slider image:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        toast.error(error.response.data.error || 'Failed to save image.');
      } else if (error.request) {
        // The request was made but no response was received
        toast.error('No response from server. Please try again.');
      } else {
        // Something happened in setting up the request
        toast.error('Error setting up request. Please try again.');
      }
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-xl font-semibold'>Upload Slider Cover Image</h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-6 w-full max-w-md'>
        <input
          type='text'
          placeholder='Enter slider title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='border border-indigo-500 p-2 rounded'
        />
        <input type='file' accept='image/*' onChange={handleImageUpload} className='p-2' />
        {image && (
          <img src={image} alt='Preview' className='h-40 w-full object-cover rounded shadow' />
        )}
        <button
          type='submit'
          disabled={uploading}
          className='bg-indigo-600 text-white px-4 py-2 rounded'
        >
          {uploading ? 'Uploading...' : 'Save Slider Image'}
        </button>
      </form>
    </div>
  );
}
