import { Ship } from './Ship';
const Gameboard = function Gameboard() {
  // setting up gameboard
  const _board = () => {
    let array = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        array.push([i.toString() + ',' + j.toString()]);
      }
    }
    return array;
  };

  const gameboard = _board();

  // start of ships' definiton and populating coords
  const populateCoordsPlayer = (coord, axis, playersShip, index) => {
    if (axis === 'xAxis') {
      for (let i = 0; i < obj[playersShip].ship.shipLength; i++) {
        let yCoord = Number(coord.charAt(2)) + i - index;
        let xCoord = coord.charAt(0);
        obj[playersShip].coords.push([xCoord + ',' + yCoord.toString()]);
        obj.coordsToBeColored.push([xCoord + ',' + yCoord.toString()]);
      }
    } else if (axis === 'yAxis') {
      for (let i = 0; i < obj[playersShip].ship.shipLength; i++) {
        let yCoord = coord.charAt(2);
        let xCoord = Number(coord.charAt(0)) + i - index;
        obj[playersShip].coords.push([xCoord.toString() + ',' + yCoord]);
        obj.coordsToBeColored.push([xCoord.toString() + ',' + yCoord]);
      }
    }
  };
  const bigShip = {
    ship: Ship(4),
    coords: [],
  };
  const midShip1 = { ship: Ship(3), coords: [] };

  const midShip2 = { ship: Ship(3), coords: [] };

  const smallShip1 = { ship: Ship(2), coords: [] };
  const smallShip2 = { ship: Ship(2), coords: [] };
  const smallShip3 = { ship: Ship(2), coords: [] };

  const tinyShip = { ship: Ship(1), coords: [] };

  const missedCoords = [];

  //Attack Functions
  const receiveAttack = (coord) => {
    let shipContainer = obj.bigShip.coords.concat(obj.midShip1.coords);
    let testForHit = shipContainer.filter(
      (x) => x.toString() === coord.toString()
    );

    if (testForHit.length === 0) {
      return obj.missedCoords.push([coord]);
    } else {
      let shipArray = [obj.bigShip, obj.midShip1];
      for (let i = 0; i < shipArray.length; i++) {
        shipArray[i].coords.filter((x) =>
          x.toString() === coord.toString()
            ? shipArray[i].ship.hit(coord)
            : null
        );
      }
    }
  };
  let fleatSunk = false;
  const didFleatSink = () => {
    let individualsSunk = [
      obj.bigShip.ship.shipSunk,
      obj.midShip1.ship.shipSunk,
    ];

    let checkIfAllSunk = individualsSunk.filter((x) => x === false);
    if (checkIfAllSunk.length === 0) {
      return (obj.fleatSunk = true);
    }
  };

  let coordsToBeColored = [];

  const obj = {
    bigShip,
    midShip1,
    midShip2,
    smallShip1,
    smallShip2,
    smallShip3,
    tinyShip,
    gameboard,
    populateCoordsPlayer,
    receiveAttack,
    missedCoords,
    didFleatSink,
    fleatSunk,
    coordsToBeColored,
  };
  return obj;
};

export { Gameboard };
