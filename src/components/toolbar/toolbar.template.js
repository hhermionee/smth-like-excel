function toButton(button) {
  const meta = `
    data-type="button"
    data-value='${JSON.stringify(button.value)}'
  `;
  return `
    <div 
      class="excel__button ${button.active ? 'active' : ''}"
      ${meta}
    >
      <span
        class="material-icons"
        ${meta}
      >
        ${button.icon}
      </span>
    </div>
  `;
}

export function createToolbar(state) {
  const buttons = [
    {
      icon: 'format_align_left',
      active: state['textAlign'] === 'left',
      value: {
        textAlign: state['textAlign'] !== 'left' ? 'left' : 'center',
      },
    },
    {
      icon: 'format_align_center',
      active: state['textAlign'] === 'center',
      value: {
        textAlign: state['textAlign'] !== 'center' ? 'center' : 'left',
      },
    },
    {
      icon: 'format_align_right',
      active: state['textAlign'] === 'right',
      value: {
        textAlign: state['textAlign'] !== 'right' ? 'right' : 'left',
      },
    },
    {
      icon: 'format_bold',
      active: state['fontWeight'] === 'bold',
      value: {
        fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold',
      },
    },
    {
      icon: 'format_italic',
      active: state['fontStyle'] === 'italic',
      value: {
        fontStyle: state['fontStyle'] === 'italic'? 'normal' :'italic',
      },
    },
    {
      icon: 'format_strikethrough',
      active: state['textDecoration'] === 'line-through',
      value: {
        textDecoration: state['textDecoration'] === 'line-through'
        ? 'none' : 'line-through',
      },
    },
  ];
  return buttons.map(toButton).join('');
}


