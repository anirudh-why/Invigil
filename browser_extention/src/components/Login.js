import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './login.css';

const goFullScreen = () => {
  const element = document.documentElement;
  const requestMethod =
    element.requestFullscreen ||
    element.webkitRequestFullscreen ||
    element.mozRequestFullScreen ||
    element.msRequestFullscreen;

  if (requestMethod) {
    requestMethod.call(element);
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else {
    console.log("Fullscreen API is not supported");
  }
};

const handleFullScreenChange = () => {
  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    alert('Violation: Exiting Full Screen not allowed');
  }
};

const fetchUserIPAndLocation = async () => {
  try {
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    if (!ipResponse.ok) throw new Error(`HTTP error! status: ${ipResponse.status}`);
    const ipData = await ipResponse.json();
    const ipAddress = ipData.ip;

    const locationResponse = await fetch(`https://freeipapi.com/api/json/${ipAddress}`);
    if (!locationResponse.ok) throw new Error(`HTTP error! status: ${locationResponse.status}`);
    const locationData = await locationResponse.json();

    const location = `${locationData.cityName}, ${locationData.countryName}, ${locationData.regionName}`;

    return { ipAddress, location };
  } catch (error) {
    console.error('Error fetching IP and location data:', error);
    return { ipAddress: '', location: '' };
  }
};

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username+password);
      const { ipAddress, location } = await fetchUserIPAndLocation();
      setTimeout(() => {
        chrome.storage.local.set({ username,code:password, loggedIn: true, IPAdd: ipAddress, loc: location }, () => {
          onLogin(username);
          goFullScreen();
        });
      }, 500); // 1 second delay

  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
    };
  }, []);

  return (
    <div className="container">
      <h2>Join Exam</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Exam Code:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Join Exam</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
