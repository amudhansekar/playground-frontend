/**
 * Converts a date to a string for the datetime-local input
 * @param date date object
 * @returns
 */
function dateToDatetimeLocalInput(date: Date): string {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, -8);
}

export { dateToDatetimeLocalInput };
