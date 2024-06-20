import React, { useState, useEffect } from 'react';
// import toast, { Toaster } from 'react-hot-toast';
import Login from './components/Login';
import TabSwitchDetector from './components/TabSwitchDetector';
import FullScreenButton from './components/FullScreenButton';
import BlockWebsites from './components/BlockedWebsites';
// import GetIpaddress from './components/GetIpaddress';
import './App.css'; // Import the App.css file

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(['loggedIn'], (result) => {
        if (result.loggedIn) {
          setLoggedIn(true);
        }
      });
    }
  }, []);

  const handleLogin = (username) => {
    setLoggedIn(true);
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set({ loggedIn: true, username });
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.clear(() => {
        console.log('');
      });
      chrome.storage.local.set({ loggedIn: false })
    }
  };
  

  return (
    <div className="App">
      <h1 className='text-center text-primary '>Samraksh</h1>
      {/* <Toaster/> */}
      {loggedIn ? (
        <div>
          <TabSwitchDetector />
          <BlockWebsites />
          <FullScreenButton />
          {/* <GetIpaddress /> */}
          <button className="exit-exam-button" onClick={handleLogout}>Exit Exam</button> {/* Apply class to button */}
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
