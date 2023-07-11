import p5 from 'p5';

export function getBackgroundColor(s: p5) {
  const bgHex = window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches
    ? '#434c5e'
    : '#fff';
  return s.color(bgHex);
}

export type UiColors = 'bg' | 'red' | 'green' | 'blue';
export const getColor = (s: p5, color: UiColors) => {
  switch (color) {
    case 'bg':
      return getBackgroundColor(s);
    case 'red':
      return s.color(255, 152, 178);
    case 'green':
      return s.color(152, 255, 204);
    case 'blue':
      return s.color(152, 229, 255);
  }
};
