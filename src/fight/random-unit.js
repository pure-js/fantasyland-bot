function getUnitType(arg, types) {
  const random = getRandomInt(0, types.length - 1);
  const type = types[random];
  return arg.getElementById(type);
}

// Get random follower
function getUnit() {
  const types = ['divDrak', 'divRyc', 'divDam'];

  const $location = document.getElementById('loc').contentWindow.document;
  const army = $location.getElementById('your_army').contentWindow.document;

  const type = getUnitType(army, types);

  const units = type.querySelectorAll('.ArmyShow');

  const activeUnits = [];

  for (const unit of units) {
    const poison = unit.querySelector('td.cp');
    if (unit.display === 'none') {
      continue;
    }
    activeUnits.push(unit.id);
  }

  const random = getRandomInt(0, activeUnits.length - 1);
  const unit = type.querySelector(`#${activeUnits[random]}`).querySelector('td.cp');
  return unit;
}

getUnit().click();
