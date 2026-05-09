import React, { useState } from 'react';
import { storage } from '@/config/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/clerk-react';
import { FiUpload, FiX, FiStar, FiFolder } from 'react-icons/fi';

export default function AddProjects() {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [desc, setDesc] = useState('');
  const [projlink, setProjLink] = useState('');
  const [githublink, setGithubLink] = useState('');
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { user } = useUser();
  const [thumbnail, setThumbnail] = useState('');

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imageArray = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const storageRef = ref(storage, `projects/${uuidv4()}`);
      uploadBytes(storageRef, file)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            imageArray.push(url);
            setImages((prev) => [...prev, url]);
            if (imageArray.length === 1) setThumbnail(url);
          });
        })
        .catch(() => toast.error('Error uploading image.'));
    }
  };

  const handleDeleteImage = (url) => {
    setImages((prev) => prev.filter((img) => img !== url));
    if (thumbnail === url) setThumbnail('');
  };

  const uploadProj = async (e) => {
    e.preventDefault();
    if (uploading) return;
    if (!user) { toast.error('User not logged in!'); return; }

    const projectData = { title, tags, desc, images, projlink, githublink, thumbnail, clerkUserId: user.id };
    try {
      setUploading(true);
      await axios.post('https://backport-backend.vercel.app/api/addproject', projectData);
      toast.success('Project added successfully!');
      setTitle(''); setDesc(''); setTags(''); setImages([]); setProjLink(''); setGithubLink(''); setThumbnail('');
    } catch {
      toast.error('Error adding project.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <Toaster position="top-right" />
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-indigo-600 text-white p-2 rounded-lg">
            <FiFolder className="text-xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Add Project</h1>
            <p className="text-sm text-gray-500">Fill in the details below to add a new project</p>
          </div>
        </div>

        <form onSubmit={uploadProj} className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Project Title</label>
            <input
              type="text"
              placeholder="e.g. Portfolio Website"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags</label>
            <input
              type="text"
              placeholder="e.g. React, Node.js, MongoDB"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
            <p className="text-xs text-gray-400 mt-1">Separate tags with commas</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea
              placeholder="Describe what this project does..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Project Images</label>
            <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition">
              <FiUpload className="text-2xl text-gray-400" />
              <span className="text-sm text-gray-500">Click to upload images</span>
              <span className="text-xs text-gray-400">PNG, JPG, WEBP — multiple allowed</span>
              <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
            </label>

            {images.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {images.map((img, i) => (
                  <div
                    key={i}
                    className={`relative rounded-lg overflow-hidden border-2 cursor-pointer transition ${
                      thumbnail === img ? 'border-indigo-500' : 'border-gray-200'
                    }`}
                    onClick={() => setThumbnail(img)}
                  >
                    <img src={img} alt="" className="h-20 w-20 object-cover" />
                    {thumbnail === img && (
                      <div className="absolute bottom-0 left-0 right-0 bg-indigo-600 text-white text-xs text-center py-0.5 flex items-center justify-center gap-1">
                        <FiStar className="text-xs" /> Cover
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleDeleteImage(img); }}
                      className="absolute top-1 right-1 bg-white/90 text-gray-700 rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                    >
                      <FiX className="text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {images.length > 0 && (
              <p className="text-xs text-gray-400 mt-2">Click an image to set it as the cover photo</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Live Project URL</label>
            <input
              type="url"
              placeholder="https://your-project.com"
              value={projlink}
              onChange={(e) => setProjLink(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">GitHub URL</label>
            <input
              type="url"
              placeholder="https://github.com/username/repo"
              value={githublink}
              onChange={(e) => setGithubLink(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Uploading...
              </>
            ) : 'Add Project'}
          </button>
        </form>
      </div>
    </div>
  );
}
