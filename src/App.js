import './App.css';
import './Setup.css';

import { Player } from './Factories/Player';
import React, { useState, useEffect, useRef, createRef } from 'react';
import { Game } from './components/Game';
import { Setup } from './components/Setup';

function App() {
  const [setup, setSetup] = useState(true);
  const [player, setPlayer] = useState(Player('Rupert'));
  const [opponent, setOpponent] = useState(Player('Computer'));
  const [rotate, setRotate] = useState('xAxis');
  const [color, setColor] = useState([]);
  const testRef = useRef([]);

  testRef.current = player.ownBoard.gameboard.map(
    (ref, index) => (testRef.current[index] = createRef())
  );

  useEffect(() => {
    player.ownBoard.coordsToBeColored.map((el) => {
      testRef.current.map((ref, index) =>
        el[0] === ref.current.attributes[0].textContent
          ? (testRef.current[index].current.classList = 'gridCell shipSpot')
          : null
      );
      return true;
    });
  }, [rotate]);

  const rotateShips = () => {
    let shipPort = document.querySelectorAll('.shipPort');
    let shipContainer = document.querySelector('.shipContainer');

    if (rotate === 'yAxis') {
      setRotate('xAxis');
      shipPort.forEach((ship) => (ship.style.flexDirection = 'var(--row)'));
      shipContainer.style.flexDirection = 'var(--column)';
    } else {
      setRotate('yAxis');
      shipPort.forEach((ship) => (ship.style.flexDirection = 'var(--column)'));
      shipContainer.style.flexDirection = 'var(--row)';
    }
  };
  const placeShipsPlayer = (coords, axis, shipType, grabbedIndex) => {
    //console.log(coords);
    //console.log(axis);
    //console.log(shipType);
    //console.log(grabbedIndex);

    if (axis === 'xAxis') {
      if (
        Number(coords.charAt(2)) +
          player.ownBoard[shipType].ship.shipLength -
          1 -
          Number(grabbedIndex) <
        10
      ) {
        player.ownBoard.populateCoordsPlayer(
          coords,
          axis,
          shipType,
          grabbedIndex
        );
        setColor((oldArray) => [...oldArray, player.ownBoard[shipType].coords]);
      }
    } else {
      if (
        Number(coords.charAt(0)) +
          player.ownBoard[shipType].ship.shipLength -
          1 -
          Number(grabbedIndex) <
        10
      ) {
        player.ownBoard.populateCoordsPlayer(
          coords,
          axis,
          shipType,
          grabbedIndex
        );
      }
    }
  };
  return setup === true ? (
    <Setup
      player={player}
      rotateShips={rotateShips}
      rotate={rotate}
      placeShipsPlayer={placeShipsPlayer}
      testRef={testRef}
      color={color}
    />
  ) : (
    <Game />
  );
}

export default App;
