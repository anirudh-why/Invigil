if (typeof chrome !== 'undefined' && chrome.tabs && chrome.storage && chrome.notifications && chrome.runtime) {
  // Listener for tab activation
  chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.storage.local.get(['loggedIn'], (result) => {
      if (result.loggedIn) {
        chrome.tabs.get(activeInfo.tabId, (tab) => {
          console.log('Tab switched to URL:', tab.url);
        });
      }
    });
  });

  // Listener for window focus changes
  chrome.windows.onFocusChanged.addListener((windowId) => {
    chrome.storage.local.get(['loggedIn'], (result) => {
      if (result.loggedIn && windowId !== chrome.windows.WINDOW_ID_NONE) {
        // Query the active tab in the newly focused window
        chrome.tabs.query({ active: true, windowId: windowId }, (tabs) => {
          if (tabs.length > 0) {
            console.log('Window switched to URL:', tabs[0].url);
          }
        });
      }
    });
  });

  // Listener for Chrome window removal (indicating Chrome is closed)
  chrome.windows.onRemoved.addListener((windowId) => {
    chrome.storage.local.get(['loggedIn'], (result) => {
      if (result.loggedIn && windowId === chrome.windows.WINDOW_ID_CURRENT) {
        console.log('Chrome has been closed.');
      }
    });
  });

  // Handle message from content script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'CHECK_STATUS') {
      // Logic to check status
      let status = 'Active';
      sendResponse({ status });
    }
  });

  console.log("Extension installed");
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ loggedIn: false });
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.loggedIn) {
    if (changes.loggedIn.newValue) {
      enableBlocking();
    } else {
      disableBlocking();
    }
  }
});

const enableBlocking = () => {
  chrome.declarativeNetRequest.updateEnabledRulesets({
    enableRulesetIds: ["ruleset_1"],
    disableRulesetIds: []
  });
};

const disableBlocking = () => {
  chrome.declarativeNetRequest.updateEnabledRulesets({
    enableRulesetIds: [],
    disableRulesetIds: ["ruleset_1"]
  });
};


function updateFeaturesEnabled(loggedIn) {
  if (loggedIn) {
    enableBlocking();
  } else {
    disableBlocking();
  }
}

// Enable or disable allowing and blocking features when extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ loggedIn: false }, () => {
    updateFeaturesEnabled(false);
  });
});

// Listen for changes in login status and update features accordingly
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.loggedIn) {
    updateFeaturesEnabled(changes.loggedIn.newValue);
  }
});

