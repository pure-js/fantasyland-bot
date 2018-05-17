function fighter() {

  const config = {
    minDelay: 0,
    maxDelay: 3700,
    leave: true,
    afterEnemy: true
  };

  const lvl = 3;

  const pattern = {
    dragon: 1,
    knight: 2,
    lady: 3,
    regular: 01,
    poison: 02,
  };

  const types = ['divDrak', 'divRyc', 'divDam'];

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
  function getUnit() {
    let $location = document.getElementById('loc').contentWindow.document;
    let army = $location.getElementById('your_army').contentWindow.document;

    let type = getUnitType(army);

    let units = type.querySelectorAll('.ArmyShow');

    let activeUnits = [];

    for(let i = 0; i < units.length; i++) {
      let unit = units[i];
      let poison = unit.querySelector('td.cp');
      if(unit.display === 'none') {
        continue;
      }
      activeUnits.push(unit.id);
    }
    let random = getRandomInt(0, activeUnits.length - 1);
    let unit = type.querySelector('#' + activeUnits[random]).querySelector('td.cp');
    return unit;
  }

  function getUnitType(arg) {
    let random = getRandomInt(0, types.length - 1);
    let type = types[random];
    return arg.getElementById(type);
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
          getUnit().click();
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
            getUnit().click();
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
    getUnit().click();
    if(config.afterEnemy) {
      enemyFollowerWatcher();
    } else {
      logWatcher();
    }
  })(config);
}
fighter();
