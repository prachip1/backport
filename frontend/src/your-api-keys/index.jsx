import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { FiCopy, FiCheck, FiKey } from 'react-icons/fi';

export default function YourApiKeys() {
  const [apiKeys, setApiKeys] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    if (user?.id) {
      const fetchApiKeys = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/your-api-keys', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.id}`,
            },
          });
          setApiKeys(response.data);
        } catch {
          console.error('Error fetching API keys');
        }
      };
      fetchApiKeys();
    }
  }, [user]);

  const copyToClipboard = (apiKey, id) => {
    navigator.clipboard.writeText(apiKey).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-emerald-500 text-white p-2 rounded-lg">
            <FiKey className="text-xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Your API Keys</h1>
            <p className="text-sm text-gray-500">Use these keys to access your portfolio data</p>
          </div>
        </div>

        {apiKeys.length > 0 ? (
          <div className="flex flex-col gap-3">
            {apiKeys.map((apiKey, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Website</p>
                    <p className="text-sm font-semibold text-gray-900 mb-3 truncate">{apiKey.website}</p>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">API Key</p>
                    <p className="text-xs font-mono bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg text-gray-700 break-all">
                      {apiKey.apiKey}
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(apiKey.apiKey, index)}
                    className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition ${
                      copiedId === index
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-600'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {copiedId === index ? (
                      <><FiCheck className="text-emerald-500" /> Copied</>
                    ) : (
                      <><FiCopy /> Copy</>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
            <FiKey className="text-3xl text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No API keys found.</p>
            <p className="text-gray-400 text-xs mt-1">Connect a website to generate your first key.</p>
          </div>
        )}
      </div>
    </div>
  );
}
