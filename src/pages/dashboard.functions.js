import {storage} from '../core/utils';

function toHTML(key) {
  const model = storage(key);
  const id = key.split(':')[1];
  return `
    <li class="dashboard__record">
      <a href="#excel/${id}">${model.title}</a>
      <strong>
        ${new Date(model.openDate).toLocaleDateString()},
        ${new Date(model.openDate).toLocaleTimeString()}
      </strong>
    </li>
  `;
}

function getAllKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes('excel')) continue;
    keys.push(key);
  }
  return keys;
}

export function createRecordsTable() {
  const keys = getAllKeys();

  if (keys.length === 0) {
    return `<p>Вы пока не создали никакой таблицы</p>`;
  }

  return `
    <div class="dashboard__list-header">
      <span>Название</span>
      <span>Дата создания</span>
    </div>

    <ul class="dashboard__list">
      ${keys.map(toHTML).join('')}
    </ul>
  `;
}
