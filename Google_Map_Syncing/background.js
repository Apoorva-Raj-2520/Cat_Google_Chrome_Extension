chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "openInMap",
      title: "Open in Map",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "openInMap") {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: openMap,
        args: [info.selectionText]
      });
    }
  });
  
  function openMap(selectedText) {
    const query = encodeURIComponent(selectedText);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
    const appleMapsUrl = `http://maps.apple.com/?q=${query}`;
    
    if (navigator.platform.indexOf('Mac') > -1) {
      window.open(appleMapsUrl, '_blank');
    } else {
      window.open(googleMapsUrl, '_blank');
    }
  }
  