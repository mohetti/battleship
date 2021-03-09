import './App.css';
import './Setup.css';

import { Player } from './Factories/Player';
import React, { useState, useEffect } from 'react';
import { Game } from './components/Game';
import { Setup } from './components/Setup';

function App() {
  const [setup, setSetup] = useState(true);
  const [player, setPlayer] = useState(Player('Rupert'));
  const [opponent, setOpponent] = useState(Player('Computer'));
  const [rotate, setRotate] = useState('xAxis');

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
    console.log('test');
  };
  return setup === true ? (
    <Setup
      player={player}
      rotateShips={rotateShips}
      rotate={rotate}
      placeShipsPlayer={placeShipsPlayer}
    />
  ) : (
    <Game />
  );
}

export default App;
