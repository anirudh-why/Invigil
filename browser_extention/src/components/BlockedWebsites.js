import  { useEffect } from 'react';

const BlockWebsites = () => {
  useEffect(() => {
    chrome.storage.local.get(['loggedIn'], (result) => {
      if (result.loggedIn) {
        enableBlocking();
      } else {
        disableBlocking();
      }
    });

    const handleStorageChange = (changes, area) => {
      if (area === 'local' && changes.loggedIn) {
        if (changes.loggedIn.newValue) {
          enableBlocking();
        } else {
          disableBlocking();
        }
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

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

  return null;
};

export default BlockWebsites;
