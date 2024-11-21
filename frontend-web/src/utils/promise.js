export const sleep = (ms = 100) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};