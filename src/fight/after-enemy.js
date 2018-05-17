function afterEnemy() {
  const $location = document.getElementById('loc').contentWindow.document;
  const $combat = $location.getElementById('combat_panel').contentWindow.document;
  const $enemyFollower = $combat.getElementById('army_pane_r');

  const enemyFollowerObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      setTimeout(function() {
        const enemy = getEnemy();
        if (enemy === 'Неизвестный') {
          getUnit().click();
        }
      }, getRandomInt(config.minDelay, config.maxDelay));

      leave(enemyFollowerObserver, $combat);
    });
  });

  const enemyFollowerConfig = {
    childList: true,
    attributes: true,
  };

  enemyFollowerObserver.observe($enemyFollower, enemyFollowerConfig);
}
