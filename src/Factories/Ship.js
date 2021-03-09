const Ship = function Ship(shipSize) {
  const shipLength = shipSize;

  const hitLocation = [];
  const hit = (coord) => {
    hitLocation.push([coord]);
    checkIfSunk();
  };

  let shipSunk = false;
  const checkIfSunk = () => {
    if (obj.hitLocation.length === obj.shipLength) {
      return (obj.shipSunk = true);
    }
    return (obj.shipSunk = false);
  };

  const obj = { shipLength, hitLocation, hit, shipSunk, checkIfSunk };
  return obj;
};

export { Ship };
