function fighter() {

  const config = {
    minDelay: 0,
    maxDelay: 3700,
    leave: true,
    types: ['divDrak', 'divRyc', 'divDam'],
    afterEnemy: true
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function leave(observer, $combat) {
    if(config.leave) {
      let leaveEl = $combat.querySelector('#la a');

      if (leaveEl) {
        observer.disconnect();
        leaveEl.click();
      }
    }
  }

  // Get random follower
  function getFollower() {
    let $location = document.getElementById('loc').contentWindow.document;
    let army = $location.getElementById('your_army').contentWindow.document;
    let randomType = config.types[getRandomInt(0, config.types.length - 1)];
    let species = army.getElementById(randomType).querySelectorAll('.ArmyShow');
    let speciesActive = [];
    for(let i = 0; i < species.length; i++) {
      if(species[i].display !== 'none') {
        speciesActive.push(species[i].id);
      }
    }
    let i = getRandomInt(0, speciesActive.length - 1);
    return army.getElementById(randomType).querySelector('#' + speciesActive[i]).querySelector('td.cp');
  }

  function getEnemy() {
    $location = document.getElementById('loc').contentWindow.document;
    $combat = $location.getElementById('combat_panel').contentWindow.document;
    $enemyFollower = $combat.getElementById('army_pane_r');
    let enemyTitle = $enemyFollower.querySelectorAll('tr td')[2].querySelectorAll('img')[1].title;
    let enemy = enemyTitle.substr(0, enemyTitle.indexOf(' '));
    return enemy;
  }

  function logWatcher() {
    let $location = document.getElementById('loc').contentWindow.document;
    let $combat = $location.getElementById('combat_panel').contentWindow.document;
    const $combatLog = $combat.getElementById('log');

    let logObserver = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        setTimeout(function() {
          getFollower().click();
        }, getRandomInt(config.minDelay, config.maxDelay));

        leave(logObserver, $combat);
      });
    });

    const logObserverConfig = {
      childList: true
    };

    logObserver.observe($combatLog, logObserverConfig);
  }

  function enemyFollowerWatcher() {
    let $location = document.getElementById('loc').contentWindow.document;
    let $combat = $location.getElementById('combat_panel').contentWindow.document;
    let $enemyFollower = $combat.getElementById('army_pane_r');

    let enemyFollowerObserver = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        setTimeout(function() {
          let enemy = getEnemy();
          if (enemy === 'Неизвестный') {
            getFollower().click();
          }
        }, getRandomInt(config.minDelay, config.maxDelay));

        leave(enemyFollowerObserver, $combat);
      });
    });

    const enemyFollowerConfig = {
      childList: true,
      attributes: true
    };

    enemyFollowerObserver.observe($enemyFollower, enemyFollowerConfig);
  }

  (function fight(config) {
    getFollower().click();
    if(config.afterEnemy) {
      enemyFollowerWatcher();
    } else {
      logWatcher();
    }
  })(config);
}
fighter();
