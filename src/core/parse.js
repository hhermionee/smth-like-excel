export function parse(value = '') {
  if (value.startsWith('=')) {
    try {
      return eval(value.slice(1)); // TODO: заменить eval как устаревшее
    } catch (e) {
      return value;
    }
  }
  return value;
}
