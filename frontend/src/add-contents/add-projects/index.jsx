import React, { useState } from 'react';
import { storage } from '@/config/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid'; // To generate unique names for the images
import { useUser } from '@clerk/clerk-react'; // Import Clerk's useUser to get user information
import { set } from 'mongoose';

export default function AddProjects() {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [desc, setDesc] = useState('');
  const [projlink, setProjLink] = useState('');
  const [githublink, setGithubLink] = useState('');
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { user } = useUser(); // Use Clerk's hook to get the logged-in user
  const [thumbnail, setThumbnail] = useState(''); // State for thumbnail

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

            // Set the first uploaded image as the thumbnail
            if (imageArray.length === 1) {
              setThumbnail(url);
            }
          });
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
          toast.error('Error uploading image.');
        });
    }
  };

  const handleDeleteImage = (url) => {
    setImages((prev) => prev.filter((image) => image !== url));
    if (thumbnail === url) {
      setThumbnail(''); // Clear thumbnail if the deleted image was the thumbnail
    }
  };

  const handleSetThumbnail = (url) => {
    setThumbnail(url); // Set the clicked image as the thumbnail
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
      githublink,
      thumbnail, // Include thumbnail in project data
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
      setGithubLink('');
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

          {/* Thumbnail Preview */}
          {thumbnail && (
            <div className='mt-4'>
              <h4>Thumbnail Preview:</h4>
              <img
                src={thumbnail}
                alt='Thumbnail'
                className='h-24 w-24 object-cover rounded border border-indigo-900'
              />
            </div>
          )}

          {/* Image Preview Section */}
          {images.length > 0 && (
            <div className='flex gap-4 mt-4'>
              {images.map((image, index) => (
                <div
                  key={index}
                  className='relative border-2 rounded'
                  style={{ borderColor: thumbnail === image ? 'green' : 'red' }} // Highlight thumbnail in green
                >
                  <img
                    src={image}
                    alt={`Preview ${index}`}
                    className='h-24 w-24 object-cover rounded cursor-pointer'
                    onClick={() => handleSetThumbnail(image)} // Set thumbnail on click
                  />
                  <button
                    className='absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center'
                    onClick={() => handleDeleteImage(image)} // Delete image on click
                  >
                    X
                  </button>
                </div>
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

          <input
            type='url'
            placeholder='Add Github Link'
            value={githublink}
            onChange={(e) => setGithubLink(e.target.value)}
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
