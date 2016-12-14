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

function random() {
  chrome.tabs.executeScript({
    file: 'src/fight/random-unit.js'
  });
}

function toggle(el) {
  console.log(el);
}

document.getElementById('fight').addEventListener('click', fight);
document.getElementById('walk').addEventListener('click', walk);
let toggles = document.getElementsByClassName('toggle');
for(let el of toggles) {
  el.addEventListener('click', toggle(this));
}

document.getElementById('fight-random').addEventListener('click', random);
