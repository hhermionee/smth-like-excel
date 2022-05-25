import {range} from '@core/utils';

export function shouldResize(event) {
  return event.target.dataset.resize;
}

export function isCell(event) {
  return event.target.dataset.type === 'cell';
}

export function matrix($current, $target) {
  const current = $current.id(true);
  const target = $target.id(true);

  const cols = range(current.col, target.col); // { row:.., col:.. }
  const rows = range(current.row, target.row);

  return cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}

export function nextSelector(key, {row, col}) {
  const MIN_VALUE_COL = 0;
  const MIN_VALUE_ROW = 1;
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;
    case 'Tab':
    case 'ArrowRight':
      col++;
      break;
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE_ROW ? MIN_VALUE_ROW : row - 1;
      break;
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE_COL ? MIN_VALUE_COL : col - 1;
      break;
  }

  return `[data-id="${row}:${col}"]`;
}
