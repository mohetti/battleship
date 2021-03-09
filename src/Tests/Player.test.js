import { Player } from './../Factories/Player';

it('Test if gameboard get executed', () => {
  let player = Player('Rudolfus');
  expect(player.name).toEqual('Rudolfus');
  expect(player.ownBoard.gameboard[0]).toEqual(['0,0']);
});

it('Test if player attack results in populated hitLocation for computer', () => {
  let player = Player('Rudolfus');
  let opponent = Player('Computer');
  opponent.ownBoard.populateCoordsPlayer(
    '0,0',
    'xAxis',
    opponent.ownBoard.bigShip
  );
  player.attack('0,1', opponent.ownBoard);
  expect(opponent.ownBoard.bigShip.ship.hitLocation).toEqual([['0,1']]);
});

it('Test if player attack results in populated missedCoords for computer', () => {
  let player = Player('Rudolfus');
  let opponent = Player('Computer');
  opponent.ownBoard.populateCoordsPlayer(
    '0,0',
    'xAxis',
    opponent.ownBoard.bigShip
  );
  player.attack('1,2', opponent.ownBoard);
  expect(opponent.ownBoard.missedCoords).toEqual([['1,2']]);
});

// random Number for computer attack needs to be tested later
