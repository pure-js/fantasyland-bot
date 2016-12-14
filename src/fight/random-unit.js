function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Get random follower
function getUnit() {
  let types = ['divDrak', 'divRyc', 'divDam'];

  let $location = document.getElementById('loc').contentWindow.document;
  let army = $location.getElementById('your_army').contentWindow.document;

  let type = getUnitType(army);

  let units = type.querySelectorAll('.ArmyShow');

  let activeUnits = [];

  for(let unit of units) {
    console.log('u', unit);
    // let unit = units[i];
    let poison = unit.querySelector('td.cp');
    console.log(poison);
    if(unit.display === 'none') {
      continue;
    }
    activeUnits.push(unit.id);
  }
  console.log(activeUnits);
  let random = getRandomInt(0, activeUnits.length - 1);
  let unit = type.querySelector('#' + activeUnits[random]).querySelector('td.cp');
  return unit;
}

function getUnitType(arg) {
  let random = getRandomInt(0, types.length - 1);
  let type = types[random];
  return arg.getElementById(type);
}

getUnit().click();
