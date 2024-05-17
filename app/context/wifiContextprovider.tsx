"use client"
import React, { useEffect, useState } from "react";
import WifiContext from "./wifiContext";
import axios from "axios";


const WifiContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [bssid, setBssid] = useState('');
  const [error, setError] = useState('');

 
  const fetchBssid = async () => {
    try {
      const response = await axios.get('http://localhost:5000/bssid');
      setBssid(response.data.bssid);
      setError('');
    } catch (err) {
      setError('Could not retrieve BSSID');
    }
  };

  useEffect(() => {
    fetchBssid();
  }, []);



    return (
        <WifiContext.Provider value={{ bssid, setBssid }}>
            {children}
        </WifiContext.Provider>
    );
};

export default WifiContextProvider;
