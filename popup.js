function fight() {
  chrome.tabs.executeScript({
    file: 'src/fighter.js'
  });
}

function walk() {
  chrome.tabs.executeScript({
    file: 'src/walker.js'
  });
}

document.getElementById('fight').addEventListener('click', fight);
document.getElementById('walk').addEventListener('click', walk);
