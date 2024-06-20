

// // Function to handle visibility change (tab switching)
// function handleVisibilityChange() {
//   chrome.storage.local.get(['loggedIn'], (result) => {
//     if (result.loggedIn && document.hidden) {
//       console.log("Violation: Tab switching not allowed");
//     }
//   });
// }



// // Function to handle key press (prevent Ctrl+C, Ctrl+V, Ctrl+X, and log Alt key press)
// function handleKeyPress(event) {
//   chrome.storage.local.get(['loggedIn'], (result) => {
//     if (result.loggedIn) {
//       if (event.ctrlKey && ['KeyC', 'KeyV', 'KeyX'].includes(event.code)) {
//         console.log(`Violation: Ctrl+${event.code.slice(-1)} not allowed`);
//         event.preventDefault();
//         event.stopPropagation();
//         return false;
//       }
//       if (event.altKey) {
//         console.log("Alt Key Press Detected");
//         event.preventDefault();
//         event.stopPropagation();
//         return false;
//       }
//     }
//   });
//   return true;
// }

// // Function to handle fullscreen change (detect exiting fullscreen)
// function handleFullscreenChange() {
//   chrome.storage.local.get(['loggedIn'], (result) => {
//     if (result.loggedIn && !document.fullscreenElement && !document.webkitFullscreenElement) {
//       console.log("Violation: Exiting Full Screen not allowed");
//       // getUserGeolocation()
//     }
//   });
// }

// // Add event listeners
// document.addEventListener("visibilitychange", handleVisibilityChange, false);
// document.addEventListener("keydown", handleKeyPress, false);
// document.addEventListener("fullscreenchange", handleFullscreenChange, false);
// document.addEventListener("webkitfullscreenchange", handleFullscreenChange, false);

// Function to add logs to chrome.storage.local
function addLog(message) {
  chrome.storage.local.get(['logs'], (result) => {
    let logs = result.logs || [];
    logs.push(message);
    chrome.storage.local.set({ logs: logs });
  });
}

// Function to handle visibility change (tab switching)
function handleVisibilityChange() {
  chrome.storage.local.get(['loggedIn'], (result) => {
    if (result.loggedIn && document.hidden) {
      const message = "Violation: Tab switching not allowed";
      console.log(message);
      addLog(message);
    }
  });
}

// Function to handle key press (prevent Ctrl+C, Ctrl+V, Ctrl+X, and log Alt key press)
function handleKeyPress(event) {
  chrome.storage.local.get(['loggedIn'], (result) => {
    if (result.loggedIn) {
      if (event.ctrlKey && ['KeyC', 'KeyV', 'KeyX'].includes(event.code)) {
        const message = `Violation: Ctrl+${event.code.slice(-1)} not allowed`;
        console.log(message);
        addLog(message);
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
      if (event.altKey) {
        const message = "Alt Key Press Detected";
        console.log(message);
        addLog(message);
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    }
  });
  return true;
}

// Function to handle fullscreen change (detect exiting fullscreen)
function handleFullscreenChange() {
  chrome.storage.local.get(['loggedIn'], (result) => {
    if (result.loggedIn && !document.fullscreenElement && !document.webkitFullscreenElement) {
      const message = "Violation: Exiting Full Screen not allowed";
      console.log(message);
      addLog(message);
      // getUserGeolocation()
    }
  });
}

// Add event listeners
document.addEventListener("visibilitychange", handleVisibilityChange, false);
document.addEventListener("keydown", handleKeyPress, false);
document.addEventListener("fullscreenchange", handleFullscreenChange, false);
document.addEventListener("webkitfullscreenchange", handleFullscreenChange, false);
