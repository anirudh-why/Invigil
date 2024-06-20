import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FullScreenButton.css';

const FullScreenButton = () => {
  const [userInfo, setUserInfo] = useState({ username: '', code: "", loggedIn: false, IPAdd: '', loc: '' });
  const [logs, setLogs] = useState([]);

  //  to upload user information
  async function uploadDb() {
    try {
      const res = await axios.put("http://localhost:5300/startexam", userInfo);
      console.log(res);
      if (res.data.message === "info sent") {
        console.log("Success: User info sent");
      } else {
        console.log("Error: User info not sent");
      }
    } catch (error) {
      console.error("Error uploading user info:", error);
    }
  }

  //  to upload logs
  async function uploadLogs() {
    try {
      const res = await axios.put("http://localhost:5300/logs", { logs });
      if (res.data.message === "logs added") {
        console.log("Success: Logs sent");
      } else {
        console.log("Error: Logs not sent");
      }
    } catch (error) {
      console.error("Error uploading logs:", error);
    }
  }

  const getLogsFromStorage = () => {
    chrome.storage.local.get(['logs'], (result) => {
      setLogs(result.logs || []);
    });
    setTimeout(getLogsFromStorage, 1000); // 1s
  };

  useEffect(() => {
    getLogsFromStorage(); 
    return () => clearTimeout(getLogsFromStorage); 
  }, []);

  useEffect(() => {
    chrome.storage.local.get(['username', 'code', 'loggedIn', 'IPAdd', 'loc'], (result) => {
      setUserInfo({
        username: result.username || '',
        loggedIn: result.loggedIn || false,
        IPAdd: result.IPAdd || '',
        loc: result.loc || '',
        code: result.code || ''
      });
    });
  }, []);

  // Upload user info when it changes
  useEffect(() => {
    if (userInfo.loggedIn) {
      uploadDb();
    }
  }, [userInfo]);

  // Upload logs when they change
  useEffect(() => {
    const intervalId = setInterval(uploadLogs, 1000);
    return () => clearInterval(intervalId);
  }, [logs]);

  const handleButtonClick = () => {
    if (userInfo.loggedIn) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: toggleFullscreenAndGeolocation,
        });
      });
    } else {
      alert('Please log in first.');
    }
  };

  function toggleFullscreenAndGeolocation() {
    function toggleFullscreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
          document.documentElement.classList.add('fullscreen-dimensions');
        });
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
        document.documentElement.classList.remove('fullscreen-dimensions');
      }
    }

    toggleFullscreen();
  }

  return (
    <div className="container1">
      <button id="fullscreenButton" onClick={handleButtonClick}>Enter Exam</button>
      {userInfo.loggedIn && (
        <>
          <p>Welcome, {userInfo.username}</p>
          <p>IP Address: {userInfo.IPAdd}</p>
          <p>Location: {userInfo.loc}</p>
        </>
      )}
    </div>
  );
};

export default FullScreenButton;
