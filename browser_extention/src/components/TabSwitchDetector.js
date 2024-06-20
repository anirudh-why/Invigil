import React, { useEffect } from 'react';
import './TabSwitchDetector.css';

const TabSwitchDetector = () => {
  useEffect(() => {
    const handleTabSwitch = (activeInfo) => {
      console.log('Tab switched to:', activeInfo.tabId);
    };

    const attachListenerIfLoggedIn = () => {
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        chrome.storage.local.get(['loggedIn'], (result) => {
          if (result.loggedIn && chrome.tabs) {
            chrome.tabs.onActivated.addListener(handleTabSwitch);
          }
        });
      }
    };

    attachListenerIfLoggedIn();

    return () => {
      if (typeof chrome !== 'undefined' && chrome.tabs) {
        chrome.tabs.onActivated.removeListener(handleTabSwitch);
      }
    };
  }, []);

  return (
    <div className="tab-switch-detector">
      <h1>Tab Switch Detector</h1><br />
      <h2>Rules:</h2><br/>
      <h3>1. No Use of Ctrl Keys:Ctrl+C, Ctrl+V, Ctrl+X are not allowed.</h3><br />
      <h3>2. Tab Switching is not allowed.</h3><br />
      <h3>3. Exiting fullscreen mode is not permitted.</h3>


    </div>
  );
};

export default TabSwitchDetector;
