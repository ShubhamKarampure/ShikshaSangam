function toStandardISOString(timestamp) {
  //console.log(timestamp.toString());
  if (typeof timestamp !== "string") {
    console.warn("Invalid timestamp:", timestamp);
    return null; // Handle invalid timestamp gracefully
  }

  // Match the ISO format with milliseconds precision (up to 3 digits)
  const match = timestamp.match(/(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3})/);
  if (match) {
    return `${match[1]}Z`; // Append 'Z' to indicate UTC
  }
  return timestamp; // Assume it's already valid or leave as is
}

export default function timePassed(isoString1, isoString2) {
  const standardISOString1 = toStandardISOString(isoString1.toString());
  const standardISOString2 = toStandardISOString(isoString2.toString());

  if (!standardISOString1 || !standardISOString2) {
    return "SOME INVALID isoString passed in timePassed function";
  }

  const date1 = new Date(standardISOString1);
  const date2 = new Date(standardISOString2);

  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
    return "SOME INVALID isoString passed in timePassed function";
  }

  const diffMs = Math.abs(date2 - date1);

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
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
