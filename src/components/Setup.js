// nice, dass gefunden: event.nativeEvent...
// zu tun: shipCell benötigt onDragEnter, -Leave, -Over und drop event

import uniqid from 'uniqid';
import React, { useEffect } from 'react';
export const Setup = (props) => {
  let grid = props.player.ownBoard.gameboard.map((el, index) => {
    return (
      <div
        ref={props.testRef.current[index]}
        key={uniqid()}
        dataindex={el}
        className="gridCell"
      ></div>
    );
  });

  const individualShip = (incomingShip) => {
    let thisShip = props.player.ownBoard[incomingShip].ship.shipLength;
    let domContent = [];
    for (let i = 0; i < thisShip; i++) {
      domContent.push(
        <div key={uniqid()} indexnumber={i} className="shipCell"></div>
      );
    }
    return domContent;
  };
  const dragStart = (event) => {
    let index =
      event.nativeEvent.explicitOriginalTarget.attributes[0].textContent;
    let id = event.target.id;
    let obj = {
      index,
      id,
    };
    event.dataTransfer.setData('text', JSON.stringify(obj));
    setTimeout(() => {
      event.target.classList.add('invisible');
    }, 0);
  };

  const dragEnd = (event) => {
    props.player.ownBoard.coordsToBeColored.map((el) => {
      props.testRef.current.map((ref, index) =>
        el[0] === ref.current.attributes[0].textContent
          ? (props.testRef.current[index].current.classList =
              'gridCell shipSpot')
          : null
      );
      return true;
    });
  };

  const dragEnter = (event) => {
    event.preventDefault();
  };

  const dragOver = (event) => {
    event.preventDefault();
  };

  const dragLeave = (event) => {
    event.preventDefault();
  };

  const dragDrop = (event) => {
    event.preventDefault();
    let dataTransfer = JSON.parse(event.dataTransfer.getData('text'));
    let possibleCoords = event.target.attributes[0].textContent;
    if (event.target.classList[1] === 'shipCell') {
      console.log('score');
      return;
    } else {
      props.placeShipsPlayer(
        possibleCoords,
        props.rotate,
        dataTransfer.id,
        dataTransfer.index
      );
    }
  };

  return (
    <div>
      <div className="bodyContainer">
        <div
          className="gridContainer"
          onDragEnter={dragEnter}
          onDragOver={dragOver}
          onDragLeave={dragLeave}
          onDrop={dragDrop}
        >
          {grid}
        </div>
        <div className="shipContainer">
          <div
            id="bigShip"
            className="shipPort"
            onDragStart={dragStart}
            onDragEnd={dragEnd}
            draggable={true}
          >
            {individualShip('bigShip')}
          </div>
          <div
            id="midShip1"
            className="shipPort"
            onDragStart={dragStart}
            onDragEnd={dragEnd}
            draggable={true}
          >
            {individualShip('midShip1')}
          </div>
          <div
            id="midShip2"
            className="shipPort"
            onDragStart={dragStart}
            onDragEnd={dragEnd}
            draggable={true}
          >
            {individualShip('midShip2')}
          </div>
          <div
            id="smallShip1"
            className="shipPort"
            onDragStart={dragStart}
            onDragEnd={dragEnd}
            draggable={true}
          >
            {individualShip('smallShip1')}
          </div>
          <div
            id="smallShip2"
            className="shipPort"
            onDragStart={dragStart}
            onDragEnd={dragEnd}
            draggable={true}
          >
            {individualShip('smallShip2')}
          </div>
          <div
            id="smallShip3"
            className="shipPort"
            onDragStart={dragStart}
            onDragEnd={dragEnd}
            draggable={true}
          >
            {individualShip('smallShip3')}
          </div>
          <div
            id="tinyShip"
            className="shipPort"
            onDragStart={dragStart}
            onDragEnd={dragEnd}
            draggable={true}
          >
            {individualShip('tinyShip')}
          </div>
        </div>
      </div>
      <div className="startGame">
        <button>Start Game</button>
      </div>
      <button className="rotateBtn" onClick={props.rotateShips}>
        Rotate Ships
      </button>
    </div>
  );
};
