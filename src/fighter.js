function chooseRandom(min = 0, max = 2) {
  return Math.floor(Math.random() * (max + 1 - min));
}

(function fight(maxDelay) {
  let frameset = document.querySelector('frameset');
  let loc = frameset.querySelector('frame#loc').contentWindow.document;

  let army = loc.querySelector('#your_army').contentWindow.document;
  let combat = loc.querySelector('#combat_panel').contentWindow.document;

  let solders = army.querySelectorAll('td.cp');
  let log = combat.querySelector('#log');

  let i = chooseRandom();
  solders[i].click();

  let observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      setTimeout(function() {
        let j = chooseRandom();
        solders[j].click();
      }, chooseRandom(0, 4000))
    });
  });

  let config = {
    childList: true
  };

  observer.observe(log, config);

  if (fightEnd) {
    observer.disconnect();
  }
})(4000);
