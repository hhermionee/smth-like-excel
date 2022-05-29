import {defaultStyles} from '../../constants';
import {parse} from '../../core/parse';
import {toInlineStyles} from '../../core/utils';

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function createRow(index, content = '', rowState = {}) {
  const resizer = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : '';
  const height = getHeight(rowState, index);

  return `
  <div
    class="table__row"
    data-type="resizable"
    data-row="${index}"
    style="height:${height}" 
  >
    <div class="row__info">
      ${index ? index : ''}
      ${resizer}
    </div>
      <div class="row__data">${content}</div>
  </div>
  `;
}

function toColumn({columnName = '', index, width}) {
  return `
    <div
      class="data__column-name"
      data-type="resizable"
      data-col="${index}"
      style="width: ${width}"
    >
      ${columnName}
      <div class="column-resize" data-resize="column"></div>
    </div>
    `;
}

function toCell(state, row) {
  return function(_, col) {
    const width = getWidth(state.colState, col);
    const id = `${row}:${col}`;
    const data = state.dataState[id] || '';
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id],
    });

    return `<div
      class="data__cell"
      contenteditable=""
      data-col="${col}"
      data-row="${row}"
      data-type="cell"
      data-id="${id}"
      data-value="${data || ''}"
      style="${styles};width:${width}"
    >${parse(data) || ''}</div>
    `;
  };
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function getWidth(colState, index) {
  return (colState[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(rowState, index) {
  return (rowState[index] || DEFAULT_HEIGHT) + 'px';
}

function withWidthFrom(colState) {
  return function(col, index) {
    return {
      columnName: col,
      index,
      width: getWidth(colState, index),
    };
  };
}

export function createTable(nRows = 30, state = {}) {
  const nCols = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(nCols)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state.colState))
      .map(toColumn)
      .join('');

  rows.push(createRow(null, cols)); // шапка

  for (let row = 1; row <= nRows; row++) {
    const cells = new Array(nCols)
        .fill('')
        .map(toCell(state, row))
        .join('');
    rows.push(createRow(row, cells, state.rowState)); // вся остальная таблица
  }


  return rows.join('');
}
