export default function hoursMinutes(timestamp) {
  if(timestamp===null){
    console.log("hoursMinutes got a null timestamp in isoString");
    return;
  }
  // Convert the timestamp to a Date object
  const date = new Date(timestamp);

  // Extract hours and minutes
  const hours = date.getHours().toString().padStart(2, "0"); // Ensures 2-digit format
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Ensures 2-digit format

  // Combine hours and minutes
  return `${hours}:${minutes}`;
}
