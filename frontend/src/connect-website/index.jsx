import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { FiGlobe, FiCopy, FiCheck } from 'react-icons/fi';

export default function ConnectWebsite() {
  const { user } = useUser();
  const [website, setWebsite] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const addingWeb = async (e) => {
    e.preventDefault();
    setError('');
    setApiKey('');
    if (!website) { setError('Please enter your website URL.'); return; }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/generate-api-key', {
        clerkUserId: user.id,
        website,
      });

      if (response.data.apiKey) {
        setApiKey(response.data.apiKey);
        toast.success('Website connected!');
        setTimeout(() => navigate('/add-contents'), 2500);
      } else {
        setError('Failed to generate API key. Please try again.');
      }
    } catch {
      setError('Failed to connect website. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyKey = () => {
    navigator.clipboard.writeText(apiKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Toaster position="top-right" />
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="bg-indigo-600 text-white p-3 rounded-2xl mb-4">
            <FiGlobe className="text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Connect Your Website</h1>
          <p className="text-gray-500 text-sm mt-2">Link your portfolio website to start managing content</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <form onSubmit={addingWeb} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Website URL</label>
              <input
                type="url"
                placeholder="https://yourportfolio.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email <span className="text-gray-400 font-normal">(optional)</span></label>
              <input
                type="email"
                placeholder="you@example.com"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 mt-1"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Connecting...
                </>
              ) : 'Connect Website'}
            </button>
          </form>

          {apiKey && (
            <div className="mt-6 border-t border-gray-100 pt-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Your API Key</p>
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                <p className="text-xs font-mono text-gray-700 flex-1 break-all">{apiKey}</p>
                <button
                  onClick={copyKey}
                  className={`flex-shrink-0 p-1.5 rounded-md transition ${
                    copied ? 'text-emerald-500' : 'text-gray-400 hover:text-gray-700'
                  }`}
                >
                  {copied ? <FiCheck /> : <FiCopy />}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">Save this key — you'll need it to make API requests.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
