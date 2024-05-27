const defaultCatGifUrl = 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjRmMzc1ZDJna21hb2M1Nm1sajdtYm53aDJxNnk4bmxkNGcxcGpybiZlcD12MV9pbnRlcm5naWZfYnlfaWQmY3Q9cw/JVglf7QjxaZZM2tjfB/giphy.gif';

function createCat() {
  const cat = document.createElement('img');
  cat.src = defaultCatGifUrl;
  cat.id = 'vibing-cat';
  cat.style.position = 'fixed';
  cat.style.bottom = '10px';
  cat.style.left = '10px';
  cat.style.width = '150px';
  cat.style.zIndex = 1000;
  document.body.appendChild(cat);
  
  syncCatWithMusic(cat);
}

function syncCatWithMusic(cat) {
  const player = document.querySelector('video');
  if (player) {
    setInterval(() => {
      if (player.paused) {
        cat.style.display = 'none';
      } else {
        cat.style.display = 'block';
      }
    }, 1000);
  }
}

chrome.storage.local.get(['catEnabled'], (result) => {
  if (result.catEnabled) {
    createCat();
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleCat') {
    const cat = document.getElementById('vibing-cat');
    if (request.enabled) {
      if (!cat) {
        createCat();
      }
    } else {
      if (cat) {
        cat.remove();
      }
    }
  }
});
