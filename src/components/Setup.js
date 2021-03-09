// nice, dass gefunden: event.nativeEvent...
// zu tun: shipCell benötigt onDragEnter, -Leave, -Over und drop event

import uniqid from 'uniqid';
export const Setup = (props) => {
  let grid = props.player.ownBoard.gameboard.map((el) => {
    return <div key={uniqid()} dataindex={el} className="gridCell"></div>;
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
  };

  const dragEnd = (event) => {
    console.log(event.nativeEvent.explicitOriginalTarget);
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

    console.log(dataTransfer.id);
    console.log(dataTransfer.index);
    console.log(props.rotate);
    console.log(possibleCoords);

    props.placeShipsPlayer(
      possibleCoords,
      props.rotate,
      dataTransfer.id,
      dataTransfer.index
    );
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
          <div id="midShip1" className="shipPort">
            {individualShip('midShip1')}
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
