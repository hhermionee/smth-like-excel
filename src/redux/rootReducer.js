import {
  TABLE_RESIZE,
  CHANGE_TEXT,
  CHANGE_STYLES,
  APPLY_STYLE,
  CHANGE_TITLE,
  UPDATE_DATE,
} from './types';

export function rootReducer(state, action) {
  let field;
  let val;

  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.direction === 'column' ? 'colState' : 'rowState';
      return {...state, [field]: value(state, field, action)};

    case CHANGE_TEXT:
      field = 'dataState';
      return {
        ...state,
        currentText: action.data.value,
        dataState: value(state, field, action),
      };

    case CHANGE_STYLES:
      return {...state, currentStyles: action.data};

    case APPLY_STYLE:
      field = 'stylesState';
      val = state[field] || {};
      action.data.ids.forEach((id) => {
        val[id] = {...val[id], ...action.data.value};
      });
      return {
        ...state,
        [field]: val,
        currentStyles: {...state.currentStyles, ...action.data.value},
      };

    case CHANGE_TITLE:
      field = 'tableTitle';
      return {
        ...state,
        title: action.data,
      };

    case UPDATE_DATE:
      return {...state, openDate: new Date().toJSON()};


    default: return state;
  }
}

function value(state, field, action) {
  const value = state[field] || {};
  value[action.data.id] = action.data.value;
  return value;
}
