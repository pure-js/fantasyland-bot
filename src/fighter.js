const config = {
  minDelay: 0,
  maxDelay: 3700,
  leave: true
}

const $location = document.getElementById('loc').contentWindow.document;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Get random follower
function getFollower() {
  let army = $location.getElementById('your_army').contentWindow.document;
  let solders = army.querySelectorAll('td.cp');
  let i = getRandomInt(0, 2);
  let soldersType = solders[i].parentElement.parentElement.parentElement.parentElement.parentElement;
  console.log(soldersType.id);
  return solders[i];
}

(function fight(config) {
  let combat = $location.querySelector('#combat_panel').contentWindow.document;
  let combatLog = combat.querySelector('#log');

  getFollower().click();

  let observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      setTimeout(function() {
        getFollower().click();
      }, getRandomInt(config.minDelay, config.maxDelay));

      let leaveEl = combat.querySelector('#la a');

      if (leaveEl && config.leave) {
        observer.disconnect();
        leaveEl.click();
      }
    });
  });

  const observerConfig = {
    childList: true
  };

  observer.observe(combatLog, observerConfig);
})(config);
