export default function timePassed(isoString1, isoString2) {
  const date1 = new Date(isoString1);
  const date2 = new Date(isoString2);
  const diffMs = Math.abs(date2 - date1); // Time difference in milliseconds

  //console.log(diffMs);

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const years = Math.floor(days / 365);
  if(diffMs === NaN){
    return "SOME INVALID isoString passed in timePassed function";
  }
  else if (seconds < 60 ) {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  } else if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (days < 7) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (weeks < 52) {
    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  } else {
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  }
}
