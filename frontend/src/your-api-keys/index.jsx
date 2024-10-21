import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCopy } from 'react-icons/fa';
import { useUser } from '@clerk/clerk-react';

export default function YourApiKeys() {
  const [apiKeys, setApiKeys] = useState([]);
  const { user } = useUser();  // Clerk user information

  useEffect(() => {
    console.log("user data", { user });

    // Ensure user ID is available before making the request
    if (user?.id) {
      const fetchApiKeys = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/your-api-keys', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.id}`, // Send Clerk user ID in Authorization
            },
          });
          setApiKeys(response.data);
        } catch (error) {
          console.error('Error fetching API keys:', error);
        }
      };

      fetchApiKeys();
    }
  }, [user]);  // Re-run effect when the user is available

  const copyToClipboard = (apiKey) => {
    navigator.clipboard.writeText(apiKey).then(() => {
      alert('API Key copied to clipboard!');
    });
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-mono font-bold mb-6">Your API Keys</h2>
      {apiKeys.length > 0 ? (
        <div className="flex flex-col gap-6">
          {apiKeys.map((apiKey, index) => (
            <div key={index} className="border p-4 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold">Website: {apiKey.website}</p>
                <p>API Key: {apiKey.apiKey}</p>
              </div>
              <button
                onClick={() => copyToClipboard(apiKey.apiKey)}
                className="bg-indigo-500 text-white p-2 rounded-lg flex items-center hover:bg-indigo-700"
              >
                <FaCopy className="mr-2" />
                Copy
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No API keys found.</p>
      )}
    </div>
  );
}
