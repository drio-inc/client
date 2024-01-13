// export function formatHourAgo(timestamp: number) {
//   const current = Date.now();

//   const diff = current - timestamp;

//   const hours = Math.floor(diff / (1000 * 60 * 60));

//   if (hours === 0) {
//     const minutes = Math.floor(diff / (1000 * 60));
//     return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
//   } else {
//     return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
//   }
// }

export function formatTime(timestamp: number) {
  const current = Date.now();
  const diff = current - timestamp;

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  } else if (months > 0) {
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
}
