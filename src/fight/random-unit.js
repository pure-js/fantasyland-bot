// Get random follower
function getUnit() {
  const types = ['divDrak', 'divRyc', 'divDam'];

  let $location = document.getElementById('loc').contentWindow.document;
  let army = $location.getElementById('your_army').contentWindow.document;

  let type = getUnitType(army, types);

  let units = type.querySelectorAll('.ArmyShow');

  let activeUnits = [];

  for(let unit of units) {
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

function getUnitType(arg, types) {
  let random = getRandomInt(0, types.length - 1);
  let type = types[random];
  return arg.getElementById(type);
}

getUnit().click();
