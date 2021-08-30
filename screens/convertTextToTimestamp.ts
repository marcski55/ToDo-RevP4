/**
 * The timestamps in this API are wildly inconsistent. Sometimes, it's given
 * in seconds, others in milliseconds. They are sometimes strings, strings with
 * quotes inside, and sometimes numbers. To make sure all timestamps are
 * interpreted correctly, this function was necessary.
 * @param {string} input String that was returned by the API.
 * @returns {number} Integer correctly evaluated to be milliseconds as required
 * by the Date() object.
 */

export function convertTextToTimestamp(input: string): number {
  // removes quotes that sometimes appear in the strings
  let output: any = input.replace(/"/g, '');
  // converts to milliseconds if timestamp is given in seconds
  if (output.includes('.')) {
    output = (parseFloat(output) * 1000).toString();
  }
  // return as milliseconds in integer format
  return parseInt(output);
}
