(function() {

  const config = {
    minDelay: 0,
    maxDelay: 3700,
    leave: true,
    afterEnemy: true
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

  function logWatcher() {
    let $combat = $location.querySelector('#combat_panel').contentWindow.document;
    const $combatLog = $combat.getElementById('log');

    let logObserver = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        setTimeout(function() {
          getFollower().click();
        }, getRandomInt(config.minDelay, config.maxDelay));

        let leaveEl = $combat.querySelector('#la a');

        if (leaveEl && config.leave) {
          logObserver.disconnect();
          leaveEl.click();
        }
      });
    });

    const logObserverConfig = {
      childList: true
    };

    logObserver.observe($combatLog, logObserverConfig);
  }

  function enemyFollowerWatcher() {
    let $combat = $location.querySelector('#combat_panel').contentWindow.document;
    const $enemyFollower = $combat.getElementById('army_pane_r');

    let enemyFollowerObserver = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        console.log('YES');
        setTimeout(function() {
          let enemyTitle = $enemyFollower.querySelectorAll('tr td')[2].querySelectorAll('img')[1].title;
          let enemy = enemyTitle.substr(0, enemyTitle.indexOf(' '));
          console.log(enemy);
          if (enemy === 'Неизвестный') {
            getFollower().click();
          }
        }, getRandomInt(config.minDelay, config.maxDelay));

        let leaveEl = $combat.querySelector('#la a');

        if (leaveEl && config.leave) {
          enemyFollowerObserver.disconnect();
          leaveEl.click();
        }
      });
    });

    const enemyFollowerConfig = {
      childList: true,
      attributes: true
    };

    enemyFollowerObserver.observe($enemyFollower, enemyFollowerConfig);
  }

  (function fight(config) {
    let combat = $location.querySelector('#combat_panel').contentWindow.document;

    getFollower().click();

    if(config.afterEnemy) {
      enemyFollowerWatcher();
    } else {
      logWatcher();
    }
  })(config);
})();
