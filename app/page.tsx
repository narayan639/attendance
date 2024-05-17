"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [bssid, setBssid] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch BSSID when component mounts
    fetchBssid();
  }, []);

  const fetchBssid = async () => {
    try {
      const response = await axios.get('http://localhost:5000/bssid');
      setBssid(response.data.bssid);
      setError('');
    } catch (err) {
      setError('Could not retrieve BSSID');
    }
  };

  return (
    <div>
      <h1>BSSID: {bssid}</h1>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default App;
