import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useUser } from '@clerk/clerk-react';  // Import useUser from Clerk

export default function AddProjects() {
  const { user } = useUser();  // Get the authenticated user
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [desc, setDesc] = useState('');
  const [projlink, setProjLink] = useState('');
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imageArray = [];
    for (let i = 0; i < files.length; i++) {
      imageArray.push(URL.createObjectURL(files[i])); // Create preview URLs
    }
    setImages(imageArray);
  };

  const uploadProj = async (e) => {
    e.preventDefault();

    const projectData = {
      title,
      tags,
      desc,
      images, // This would be an array of image URLs for now
      projlink,
      clerkUserId: user.id,  // Send the user's Clerk ID along with the project data
    };

    try {
      const response = await axios.post('http://localhost:5000/api/addproject', projectData);
      console.log('Project added:', response.data);
      toast.success('Project Data Submitted');
      setTitle('');
      setDesc('');
      setTags('');
      setImages([]);
      setProjLink('');
    } catch (error) {
      console.error('Error adding project:', error);
      toast.error('Failed to submit project');
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

          {/* Project link */}
          <input
            type='url'
            placeholder='Add Project Link'
            value={projlink}
            onChange={(e) => setProjLink(e.target.value)}
            className='p-2 border border-indigo-900 rounded'
          />

          <button className='bg-indigo-900 text-gray-200 p-4'>Add project</button>
        </form>
      </div>
    </div>
  );
}
