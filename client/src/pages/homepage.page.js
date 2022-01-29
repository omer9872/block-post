import React, { useState, useEffect, useRef } from 'react';

// components...
import Navbar from '../components/navbar.component';

// utils...
import { PostStorageContract } from '../utils';

const Home = () => {

  const [psc, setPSC] = useState(undefined);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const pscRef = new PostStorageContract();
    setPSC(pscRef);

    document.addEventListener('web3init', async (e) => {
      if (e.detail.isInitialized) {
        setUsername(await pscRef.getUsername())
      }
    })

    return () => {
      document.removeEventListener('web3init');
    }
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center">
      <Navbar />
      <div className="flex-grow">
        <div className="m-2 p-2 flex flex-row justify-center items-center rounded-xl bg-blue-500">
          <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Your Username..." className="mx-2 bg-transparent text-white placeholder:text-white focus:outline-none focus:border-b" />
          <button onClick={() => psc.setUsername(username)} className="p-1 bg-transparent text-white rounded-full hover:bg-white hover:text-blue-500 duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;