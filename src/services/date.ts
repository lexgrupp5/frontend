export function isUpcoming (startDate: Date) {
  return new Date() < startDate;
}

export function isCompleted (endDate: Date) {
  return new Date() > endDate; 
}

export function isOngoing (startDate: Date, endDate: Date) {
  const dateNow = new Date();
  return dateNow > startDate && dateNow < endDate;
}
