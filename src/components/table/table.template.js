const CODES = {
  A: 65,
  Z: 90,
};

function createRow(index, content = '') {
  return `
  <div class="table__row">
    <div class="row__info">${index ? index : ''}</div>
      <div class="row__data">${content}</div>
  </div>
  `;
}

function toColumn(content = '') {
  return `
    <div class="data__column-name">${content}</div>
    `;
}

function toCell(content = '', selected = '') {
  return `
    <div class="data__cell ${selected}" contenteditable=""></div>
    `;
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

  for (let i = 1; i <= nRows; i++) {
    const cells = new Array(nCols)
        .fill('')
        .map(toCell)
        .join('');
    rows.push(createRow(i, cells)); // вся остальная таблица
  }


  return rows.join('');
}
