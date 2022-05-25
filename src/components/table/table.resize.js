import {$} from '@core/dom';

export function resizeHandler($root, event) {
  const $resizer = $(event.target);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();

  const direction = $resizer.data.resize;
  const sideProp = direction === 'column' ? 'bottom' : 'right';
  $resizer.css({
    opacity: '100%',
    [sideProp]: '-5000px',
  });
  let value;

  const colNumber = $parent.data.col;

  document.onmousemove = (e) => {
    if (direction === 'column') {
      const deltaX = e.pageX - coords.right;
      value = coords.width + deltaX;
      $resizer.css({right: -deltaX + 'px'});
    } else {
      const deltaY = e.pageY - coords.bottom;
      value = coords.height + deltaY;
      $resizer.css({bottom: -deltaY + 'px'});
    }
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;

    $resizer.css({
      opacity: '0%',
      right: 0,
      bottom: 0,
    });

    if (direction === 'column') {
      $parent.css({width: value + 'px'});
      $root.$el
          .querySelectorAll(`[data-col="${colNumber}"]`)
          .forEach((cell) => cell.style.width = value + 'px');
    } else {
      $parent.css({height: value + 'px'});
    }
  };
}
