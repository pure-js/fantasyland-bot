const $location = document.getElementById('loc').contentWindow.document;
const $noCombat = $location.getElementsByName('no_combat')[0].contentWindow.document;

function cheerfulness() {
  let $cheerfulness = $noCombat.getElementById('hru').innerHTML;
  let cheerfulness = Number($cheerfulness.split(' ')[1].slice(0, -1));
  return cheerfulness;
}

function directions() {
  let arr = [];
  for(let i = 1; i < 8; i += 2) {
    let $current = $noCombat.getElementById('d' + i).childNodes[0];
    if($current.title.length > 0) {
      arr.push($current.parentElement.id);
    }
  }
  return arr;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function takeStep() {
  let ways = directions();
  let random = getRandomInt(0, ways.length - 1);
  let randomWay = ways[random];
  $noCombat.getElementById(randomWay).childNodes[0].click();
}

function go() {
  let cheers = cheerfulness();
  if(cheers >= 5) {
    takeStep();
    setTimeout(go, 900);
  } else {
    let wait = (100 - cheers) * 1000;
    setTimeout(go, wait);
  }
}

go();
