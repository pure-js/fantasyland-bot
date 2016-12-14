function afterEnemy() {
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
