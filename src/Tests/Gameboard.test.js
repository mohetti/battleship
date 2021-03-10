import { Gameboard } from './../Factories/Gameboard';

//Testing Gamboard functionality
it('Testing if Gameboard gets initialized', () => {
  let player = Gameboard();
  expect(player.gameboard[3]).toEqual(['0,3']);
});
it('Testing if Ship gets represented in Gameborad', () => {
  let player = Gameboard();
  expect(player.bigShip.ship.shipLength).toEqual(4);
});
it('testing if coords for ship get initialized on xAxis', () => {
  let player = Gameboard();
  player.populateCoordsPlayer('0,0', 'xAxis', player.bigShip);
  expect(player.bigShip.coords).toEqual([['0,0'], ['0,1'], ['0,2'], ['0,3']]);
});

it('testing if coords for ship get initialized on yAxis', () => {
  let player = Gameboard();
  player.populateCoordsPlayer('0,0', 'yAxis', player.bigShip);
  expect(player.bigShip.coords).toEqual([['0,0'], ['1,0'], ['2,0'], ['3,0']]);
});

/*it('testing if coords dont get printed when over xAxis', () => {
  let player = Gameboard();
  player.populateCoordsPlayer('0,8', 'xAxis', player.midShip1);
  expect(player.midShip1.coords).toEqual([]);
});

it('testing if coords dont get printed when over yAxis', () => {
  let player = Gameboard();
  player.populateCoordsPlayer('8,0', 'yAxis', player.midShip1);
  expect(player.midShip1.coords).toEqual([]);
});*/

it('Testing if receiveAttack populates hitLocation of right Ship and mark ship as sunk', () => {
  let player = Gameboard();
  player.populateCoordsPlayer('0,1', 'xAxis', player.bigShip);
  player.receiveAttack('0,2');
  player.receiveAttack('0,3');
  player.receiveAttack('0,1');
  player.receiveAttack('0,4');
  expect(player.bigShip.ship.hitLocation).toEqual([
    ['0,2'],
    ['0,3'],
    ['0,1'],
    ['0,4'],
  ]);
  expect(player.midShip1.ship.hitLocation).toEqual([]);
  expect(player.bigShip.ship.shipSunk).toBeTruthy();
  expect(player.midShip1.ship.shipSunk).toBeFalsy();
});

it('Testing if missed coordinates get stored', () => {
  let player = Gameboard();
  player.populateCoordsPlayer('0,1', 'xAxis', player.bigShip);
  player.receiveAttack('0,5');
  player.receiveAttack('0,7');
  player.receiveAttack('0,1');
  expect(player.missedCoords).toEqual([['0,5'], ['0,7']]);
  expect(player.bigShip.ship.hitLocation).toEqual([['0,1']]);
});

it('Testing if all ships are sunk turns true', () => {
  let player = Gameboard();
  player.populateCoordsPlayer('0,0', 'xAxis', player.midShip1);
  player.populateCoordsPlayer('1,0', 'xAxis', player.bigShip);
  player.receiveAttack('0,0');
  player.receiveAttack('0,1');
  player.receiveAttack('0,2');
  player.receiveAttack('1,0');
  player.receiveAttack('1,1');
  player.receiveAttack('1,2');
  player.receiveAttack('1,3');
  player.didFleatSink();
  expect(player.fleatSunk).toBeTruthy();
});

it('Testing if only some ships are sunk turns overall false', () => {
  let player = Gameboard();
  player.populateCoordsPlayer('0,0', 'xAxis', player.midShip1);
  player.populateCoordsPlayer('1,0', 'xAxis', player.bigShip);
  player.receiveAttack('0,1');
  player.receiveAttack('0,2');
  player.receiveAttack('1,0');
  player.receiveAttack('1,1');
  player.receiveAttack('1,2');
  player.receiveAttack('1,3');
  player.didFleatSink();
  expect(player.fleatSunk).toBeFalsy();
});
