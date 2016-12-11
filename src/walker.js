function walker() {

  const $location = document.getElementById('loc').contentWindow.document;
  const $noCombat = $location.getElementsByName('no_combat')[0].contentWindow.document;
  const config = {
    width: 200,
    height: 200
  }

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

  function pick() {
    let item = $noCombat.getElementById('picks').querySelectorAll('tr td img')[0];
    if(item) {
      item.click();
      setTimeout(pick, getRandomInt(200, 280));
    }
  }

  function lookAround() {
    let picks = $noCombat.getElementById('picks').childNodes.length;
    if(picks > 0) {
      pick();
    }
  }

  function takeStep() {
    let ways = directions();
    let random = getRandomInt(0, ways.length - 1);
    let randomWay = ways[random];
    $noCombat.getElementById(randomWay).childNodes[0].click();
  }

  function findCaptcha() {
    let captcha = $noCombat.getElementById('cod').style.display;
    return (captcha !== 'none');
  }

  function go() {
    if(findCaptcha()) {
      return false;
    }
    let cheers = cheerfulness();
    if(cheers >= 5) {
      lookAround();
      takeStep();
      setTimeout(go, getRandomInt(600, 1000));
    } else {
      let wait = (100 - cheers) * 1000;
      setTimeout(go, wait);
    }
  }

  go();
}
walker();
