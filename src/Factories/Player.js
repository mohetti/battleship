import { Gameboard } from './Gameboard';

const Player = (playerName) => {
  let name = playerName;
  const ownBoard = Gameboard();
  const attack = (coord, opp) => {
    return opp.receiveAttack(coord);
  };
  const __arrayToPickFrom = () => {
    let array = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        array.push([i.toString() + ',' + j.toString()]);
      }
    }
    return array;
  };

  let pickAtRandom = __arrayToPickFrom();

  const computerAttacks = (opp) => {
    let index = Math.floor(Math.random * pickAtRandom.length);
    let coord = pickAtRandom[index];
    pickAtRandom.splice(index, 1);
    return opp.receiveAttack(coord);
  };

  const obj = { name, ownBoard, attack, computerAttacks };
  return obj;
};

export { Player };
