import React, { useEffect } from 'react';

const Toast = () => {
  useEffect(() => {
    // Create the button element
    const button = document.createElement('button');
    button.textContent = 'Click Me';
    button.style.position = 'fixed';
    button.style.top = '10px';
    button.style.left = '10px';
    button.style.padding = '10px 20px';
    button.style.backgroundColor = '#007bff';
    button.style.color = '#fff';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.style.zIndex = '1000'; // Ensure it is on top of other elements

    // Append the button to the body of the HTML document
    document.body.appendChild(button);

    // Remove the button after 2 seconds
    setTimeout(() => {
      document.body.removeChild(button);
    }, 2000);

    // Clean up the button when the component unmounts
    return () => {
      if (document.body.contains(button)) {
        document.body.removeChild(button);
      }
    };
  }, []); // Run this effect only once

  return null; // This component doesn't render anything visible
};

export default Toast;
