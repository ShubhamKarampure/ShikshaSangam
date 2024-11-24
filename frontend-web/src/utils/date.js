export const addOrSubtractDaysFromDate = (days, add, startingDate = new Date()) => {
  if (add) return new Date(new Date().setDate(startingDate.getDate() + days));else return new Date(new Date().setDate(startingDate.getDate() - days));
};
export const addOrSubtractMinutesFromDate = (minutes, add, startingDate = new Date()) => {
  if (add) return new Date(new Date().setMinutes(startingDate.getMinutes() + minutes));else return new Date(new Date().setMinutes(startingDate.getMinutes() - minutes));
};
export const timeSince = date => {
  if (typeof date !== 'object') {
    date = new Date(date);
  }
  const seconds = Math.floor((new Date().valueOf() - date.valueOf()) / 1000);
  let interval = 0;
  let intervalType = '';
  const intervals = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };
  for (const [key, value] of Object.entries(intervals)) {
    interval = Math.floor(seconds / value);
    if (interval >= 1) {
      intervalType = key;
      break;
    }
  }
  if (interval > 1 || interval === 0) {
    intervalType += 's';
  }
  return `${interval} ${intervalType} ago`;
};