export function formatToLongDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
}

export function formatToLongDateTime(dateString) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const date = new Date(dateString);
  return date.toLocaleString("en-US", options);
}

export function formatToRelativeTime(dateString) {
  const now = new Date();
  const targetDate = new Date(dateString);
  const timeDiff = now - targetDate; // Time difference in milliseconds

  const seconds = Math.floor(timeDiff / 1000); // Total seconds
  const minutes = Math.floor(seconds / 60); // Total minutes
  const hours = Math.floor(minutes / 60); // Total hours
  const days = Math.floor(hours / 24); // Total days
  const months = Math.floor(days / 30); // Total months
  const years = Math.floor(days / 365); // Total years

  if (seconds < 60) {
    return seconds === 1 ? "a few seconds ago" : `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return minutes === 1 ? "a minute ago" : `${minutes} minutes ago`;
  } else if (hours < 24) {
    return hours === 1 ? "an hour ago" : `${hours} hours ago`;
  } else if (days < 30) {
    return days === 1 ? "yesterday" : `${days} days ago`;
  } else if (months < 12) {
    return months === 1 ? "a month ago" : `${months} months ago`;
  } else {
    return years === 1 ? "a year ago" : `${years} years ago`;
  }
}
