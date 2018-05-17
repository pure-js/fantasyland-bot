function random() {
  chrome.tabs.executeScript({
    file: 'src/random.js',
  });
}

function fight() {
  chrome.tabs.executeScript({
    file: 'src/fighter.js',
  });
}

function walk() {
  chrome.tabs.executeScript({
    file: 'src/walker.js',
  });
}

function randomUnit() {
  chrome.tabs.executeScript({
    file: 'src/fight/random-unit.js',
  });
}

function captcha() {
  chrome.tabs.executeScript({
    file: 'src/captcha.js',
  });
}

function toggle(el) {
  console.log(el);
}

function popup() {
  random();

  document.getElementById('fight').addEventListener('click', fight);
  document.getElementById('walk').addEventListener('click', walk);
  const toggles = document.getElementsByClassName('toggle');
  for (const el of toggles) {
    el.addEventListener('click', toggle(this));
  }

  document.getElementById('fight-random').addEventListener('click', randomUnit);
  document.getElementById('captcha').addEventListener('click', captcha);
}

export default popup();
