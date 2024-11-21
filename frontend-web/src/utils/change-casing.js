export const snakeToTitleCase = value => {
  return value.split('_').filter(x => x.length > 0).map(x => x.charAt(0).toUpperCase() + x.slice(1)).join(' ');
};
export const kebabToTitleCase = value => {
  return value.split('-').filter(x => x.length > 0).map(x => x.charAt(0).toUpperCase() + x.slice(1)).join(' ');
};
export const toSentenceCase = value => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};
export const toAlphaNumber = n => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K';
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B';
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T';
};