/** 
 * This converts iso date to short date.
 * @param {String} dateStr ISO date in string format (YYYY-mm-dd)
 */
export function isoToShortDate(dateStr) {
  var arr = dateStr.split('-');
  return arr[2] + '/' + arr[1] + '/' + arr[0];
}