function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getCheerfulness(doc) {
  const $cheerfulness = doc.getElementById('hru').textContent;
  return Number($cheerfulness.split(' ')[1].slice(0, -1));
}

function getDirectionById(id) {
  let direction;
  switch (id) {
    case 'd1':
      direction = 'north';
      break;
    case 'd3':
      direction = 'west';
      break;
    case 'd5':
      direction = 'east';
      break;
    case 'd7':
      direction = 'south';
      break;
    default:
      break;
  }
  return direction;
}

function getIdByDirection(direction) {
  let id;
  switch (direction) {
    case 'north':
      id = 'd1';
      break;
    case 'west':
      id = 'd3';
      break;
    case 'east':
      id = 'd5';
      break;
    case 'south':
      id = 'd7';
      break;
    default:
      break;
  }
  return id;
}

function directions(doc) {
  const availableDirections = [];
  for (let i = 1; i < 8; i += 2) {
    const $current = doc.getElementById(`d${i}`).childNodes[0];
    if ($current.title.length > 0) {
      const { id } = $current.parentElement;
      availableDirections.push(getDirectionById(id));
    }
  }
  console.log(availableDirections);
  return availableDirections;
}

function pick(doc) {
  const item = doc.getElementById('picks').querySelectorAll('tr td img')[0];
  if (item) {
    item.click();
    setTimeout(pick, getRandomIntInclusive(170, 280));
  }
}

function lookAround(doc) {
  const picks = doc.getElementById('picks').childNodes.length;
  if (picks > 0) pick(doc);
}

function randomWay(ways) {
  const random = getRandomIntInclusive(0, ways.length - 1);
  return ways[random];
}

function step(doc) {
  const ways = directions(doc);
  const id = getIdByDirection(randomWay(ways));
  doc.getElementById(id).childNodes[0].click();
}

function findCaptcha(doc) {
  const captcha = doc.getElementById('cod').style.display;
  return (captcha !== 'none');
}

// function getObjFromString(str) {
//   const floor = str.indexOf('L-');
// }

let iterator = 0;

function locationObserver(doc) {
  const $title = doc.getElementById('title');

  // Options for the observer (which mutations to observe)
  const config = {
    characterData: false,
    attributes: false,
    childList: true,
    subtree: false,
  };

  // Callback function to execute when mutations are observed
  function callback(mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        const location = doc.getElementById('title').getElementsByTagName('b')[0].textContent;
        let prevLocation = '';
        chrome.storage.sync.get(['prevLocation'], (result) => {
          prevLocation = result.prevLocation;
          console.log('Value currently is ' + result.prevLocation);
        });
        if (location !== prevLocation) {
          console.log(location, prevLocation);
          chrome.storage.sync.set({ prevLocation: location }, () => {
            console.log('Value is set to ' + location);
          });
          observer.disconnect();
          const waitBeforeExecuting = getRandomIntInclusive(50, 300);
          setTimeout(() => {
            walk(doc);
          }, waitBeforeExecuting);
        }
      }
    }
  }
  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);
  // Start observing the target node for configured mutations
  observer.observe($title, config);
}

function walk(doc) {
  if (!findCaptcha(doc)) {
    let cheers = 100;
    if (iterator > 17) {
      cheers = getCheerfulness(doc);
    }
    if (cheers >= 5) {
      lookAround(doc);
      step(doc);
      iterator += 1;
      console.log(iterator);
      locationObserver(doc);
    } else {
      console.log('called');
      iterator = 0;
      const wait = (100 - cheers) * 1000;
      setTimeout(() => {
        walk(doc);
      }, wait);
    }
  }
}

function walker() {
  const $location = document.getElementById('loc').contentWindow.document;
  const $noCombat = $location.getElementsByName('no_combat')[0].contentWindow.document;

  const prevLocation = $noCombat.getElementById('title').getElementsByTagName('b')[0].textContent;
  chrome.storage.sync.set({ prevLocation }, () => {
    console.log('Value is set to ' + prevLocation);
  });
  walk($noCombat);
}
walker();
