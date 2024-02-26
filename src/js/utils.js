/**
 * @todo
 * @param index - индекс поля
 * @param boardSize - размер квадратного поля (в длину или ширину)
 * @returns строка - тип ячейки на поле:
 *
 * top-left
 * top-right
 * top
 * bottom-left
 * bottom-right
 * bottom
 * right
 * left
 * center
 *
 * @example
 * ```js
 * calcTileType(0, 8); // 'top-left'
 * calcTileType(1, 8); // 'top'
 * calcTileType(63, 8); // 'bottom-right'
 * calcTileType(7, 7); // 'left'
 * ```
 * */
export function calcTileType(index, boardSize) {
  if (index === 0) {
    return 'top-left';
  } if (index === boardSize - 1) {
    return 'top-right';
  } if (index === boardSize * boardSize - boardSize) {
    return 'bottom-left';
  } if (index === boardSize * boardSize - 1) {
    return 'bottom-right';
  } if (index < boardSize - 1) {
    return 'top';
  } if (index > boardSize * boardSize - boardSize) {
    return 'bottom';
  } if (index % boardSize === 0) {
    return 'left';
  } if ((index + 1) % boardSize === 0) {
    return 'right';
  }
  return 'center';
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}

export function getArea(index, radius, boardSize) {
  const areaArray = [];
  const indexCoordinates = getCoordinates(index,boardSize);

  for (let i=0; i < boardSize*boardSize; i++) {
    
    const iRow = getCoordinates(i,boardSize).row;
    const iColumn = getCoordinates(i,boardSize).column;
    
    if ((iRow >= indexCoordinates.row-radius && iRow <= indexCoordinates.row+radius) &&
      (iColumn >= indexCoordinates.column-radius && iColumn <= indexCoordinates.column+radius)) {
      areaArray.push(i);
      }
  }
  return areaArray;  
}

function getCoordinates(index,boardSize) {
  const row = Math.ceil((index+1)/boardSize);
  const column = index % boardSize+1;
  return {
    row,
    column
  }
}


