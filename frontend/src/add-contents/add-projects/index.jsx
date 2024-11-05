import React, { useState } from 'react';
import { storage } from '@/config/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid'; // To generate unique names for the images
import { useUser } from '@clerk/clerk-react'; // Import Clerk's useUser to get user information

export default function AddProjects() {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [desc, setDesc] = useState('');
  const [projlink, setProjLink] = useState('');
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { user } = useUser(); // Use Clerk's hook to get the logged-in user

  // Function to handle image uploads to Firebase
  const handleImageChange = (e) => {
    const files = e.target.files;
    const imageArray = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const storageRef = ref(storage, `projects/${uuidv4()}`); // Unique reference for each image

      // Upload each image
      uploadBytes(storageRef, file)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            imageArray.push(url); // Store the download URL in the array
            setImages((prev) => [...prev, url]); // Update the images state with Firebase URLs
          });
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
          toast.error('Error uploading image.');
        });
    }
  };

  const uploadProj = async (e) => {
    e.preventDefault();

    if (uploading) {
      return; // Prevent duplicate submissions
    }

    if (!user) {
      toast.error('User not logged in!');
      return;
    }

    const projectData = {
      title,
      tags,
      desc,
      images, // Firebase Storage URLs
      projlink,
      clerkUserId: user.id, // Include clerkUserId in project data
    };

    try {
      setUploading(true);
      const response = await axios.post('https://backport-backend.vercel.app/api/addproject', projectData);
      console.log('Project added:', response.data);
      toast.success('Project Data Submitted');
      setTitle('');
      setDesc('');
      setTags('');
      setImages([]);
      setProjLink('');
    } catch (error) {
      console.error('Error adding project:', error);
      toast.error('Error adding project.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <h2>Add Projects</h2>
      <div className='mt-8'>
        <form className='flex flex-col gap-4' onSubmit={uploadProj}>
          <input
            type='text'
            placeholder='Add title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='p-2 border border-indigo-900 rounded'
          />
          <input
            type='text'
            placeholder='Add tags'
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className='p-2 border border-indigo-900 rounded'
          />
          <input
            type='text'
            placeholder='Add description'
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className='p-2 border border-indigo-900 rounded'
          />
          <input
            type='file'
            accept='image/*'
            multiple
            onChange={handleImageChange}
            className='p-2 border border-indigo-900 rounded'
          />

          {/* Image Preview Section */}
          {images.length > 0 && (
            <div className='flex gap-4 mt-4'>
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Preview ${index}`}
                  className='h-24 w-24 object-cover rounded border border-indigo-900'
                />
              ))}
            </div>
          )}

          <input
            type='url'
            placeholder='Add Project Link'
            value={projlink}
            onChange={(e) => setProjLink(e.target.value)}
            className='p-2 border border-indigo-900 rounded'
          />

          <button className='bg-indigo-900 text-gray-200 p-4' disabled={uploading}>
            {uploading ? 'Uploading...' : 'Add project'}
          </button>
        </form>
      </div>
    </div>
  );
}
