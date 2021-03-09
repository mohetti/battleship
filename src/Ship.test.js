import { Ship } from './Factories/Ship';

// Testing Factory of Ship
it('Shiplength gets represented', () => {
  let bigShip = Ship(4);
  expect(bigShip.shipLength).toEqual(4);
});

it('Hit Ship Function stores coordinates in Array hitLocation', () => {
  let bigShip = Ship(4);
  bigShip.hit('1,2');
  bigShip.hit('1,3');
  expect(bigShip.hitLocation).toEqual([['1,2'], ['1,3']]);
  expect(bigShip.hitLocation.length).toEqual(2);
});

it('Test if ship gets flagged as sunk', () => {
  let midShip = Ship(2);
  midShip.hit('1,2');
  midShip.hit('1,3');
  midShip.checkIfSunk();
  expect(midShip.shipSunk).toBeTruthy();
});

it('Test if ship doesnt get flagged as sunk', () => {
  let midShip = Ship(2);
  midShip.hit('1,3');
  midShip.checkIfSunk();
  expect(midShip.shipSunk).toBeFalsy();
});
