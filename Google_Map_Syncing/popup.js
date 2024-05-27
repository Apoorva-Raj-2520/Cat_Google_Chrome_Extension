document.getElementById('googleMaps').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const query = encodeURIComponent(tabs[0].title);
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
      chrome.tabs.create({ url: googleMapsUrl });
    });
  });
  
//   document.getElementById('appleMaps').addEventListener('click', () => {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       const query = encodeURIComponent(tabs[0].title);
//       const appleMapsUrl = `http://maps.apple.com/?q=${query}`;
//       chrome.tabs.create({ url: appleMapsUrl });
//     });
//   });
  