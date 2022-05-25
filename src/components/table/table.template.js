const CODES = {
  A: 65,
  Z: 90,
};

function createRow(index, content = '') {
  const resizer = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : '';

  return `
  <div class="table__row" data-type="resizable">
    <div class="row__info">
      ${index ? index : ''}
      ${resizer}
    </div>
      <div class="row__data">${content}</div>
  </div>
  `;
}

function toColumn(columnName = '', index) {
  return `
    <div class="data__column-name" data-type="resizable" data-col="${index}">
      ${columnName}
      <div class="column-resize" data-resize="column"></div>
    </div>
    `;
}

function toCell(row) {
  return function(_, col) {
    return `<div
      class="data__cell"
      contenteditable=""
      data-col="${col}"
      data-row="${row}"
      data-type="cell"
      data-id="${row}:${col}"
    ></div>
    `;
  };
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(nRows = 30) {
  const nCols = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(nCols)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');

  rows.push(createRow(null, cols)); // шапка

  for (let row = 1; row <= nRows; row++) {
    const cells = new Array(nCols)
        .fill('')
        .map(toCell(row))
        .join('');
    rows.push(createRow(row, cells)); // вся остальная таблица
  }


  return rows.join('');
}
