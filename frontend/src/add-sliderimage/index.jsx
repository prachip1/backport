import React, { useState } from 'react';
import { storage } from '@/config/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/clerk-react';
import { FiUpload, FiImage } from 'react-icons/fi';

export default function AddSliderimage() {
  const [image, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const { user } = useUser();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const storageRef = ref(storage, `slider/${uuidv4()}`);
    setUploading(true);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      setImageUrl(url);
      toast.success('Image uploaded!');
    } catch {
      toast.error('Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !title) { toast.error('Please provide a title and image.'); return; }
    try {
      const response = await axios.post('https://backport-backend.vercel.app/api/addsliderimage', {
        title, image, clerkUserId: user.id,
      });
      if (response.data.success) {
        toast.success('Slider image added!');
        setImageUrl('');
        setTitle('');
      } else {
        toast.error(response.data.error || 'Failed to save image.');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to save image.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <Toaster position="top-right" />
      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-pink-500 text-white p-2 rounded-lg">
            <FiImage className="text-xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Add Slider Image</h1>
            <p className="text-sm text-gray-500">Upload a cover image for your portfolio slider</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Slide Title</label>
            <input
              type="text"
              placeholder="e.g. My Latest Project"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Slide Image</label>
            <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:border-pink-400 hover:bg-pink-50 transition">
              {uploading ? (
                <>
                  <span className="w-6 h-6 border-2 border-pink-300 border-t-pink-500 rounded-full animate-spin" />
                  <span className="text-sm text-gray-500">Uploading...</span>
                </>
              ) : (
                <>
                  <FiUpload className="text-2xl text-gray-400" />
                  <span className="text-sm text-gray-500">Click to upload image</span>
                  <span className="text-xs text-gray-400">PNG, JPG, WEBP</span>
                </>
              )}
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>

          {image && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Preview</label>
              <img src={image} alt="Preview" className="w-full h-48 object-cover rounded-xl border border-gray-200" />
            </div>
          )}

          <button
            type="submit"
            disabled={uploading || !image}
            className="mt-2 w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-200 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
          >
            Save Slider Image
          </button>
        </form>
      </div>
    </div>
  );
}
