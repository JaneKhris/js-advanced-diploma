import { calcTileType } from '../utils';

test.each([
  [0, 8, 'top-left'],
  [1, 8, 'top'],
  [7, 8, 'top-right'],
  [56, 8, 'bottom-left'],
  [63, 8, 'bottom-right'],
  [62, 8, 'bottom'],
  [15, 8, 'right'],
  [8, 8, 'left'],
  [9, 8, 'center'],
])('test calcTileType function', (index, boardSize, expected) => {
  expect(calcTileType(index, boardSize)).toEqual(expected);
});
