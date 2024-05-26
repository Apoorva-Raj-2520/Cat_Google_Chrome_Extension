document.addEventListener('DOMContentLoaded', () => {
    const catToggle = document.getElementById('cat-toggle');
  
    // Load the saved toggle state
    chrome.storage.local.get(['catEnabled'], (result) => {
      catToggle.checked = result.catEnabled || false;
    });
  
    catToggle.addEventListener('change', () => {
      const enabled = catToggle.checked;
      chrome.storage.local.set({ catEnabled: enabled });
  
      // Send a message to the content script to toggle the cat
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleCat', enabled });
      });
    });
  });
  