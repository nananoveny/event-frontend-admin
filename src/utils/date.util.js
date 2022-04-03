export const coverTimeToDate = (timeStr) => {
  if (Date.parse(timeStr)) {
    return new Date(timeStr);
  }
  const time = timeStr.split(' ')[0];
  return new Date(`1970-01-01 ${time}:00`);
};
