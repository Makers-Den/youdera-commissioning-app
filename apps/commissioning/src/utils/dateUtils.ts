
/**
 * @param str Assume ISO format string
 */
export function formatIsoDate(str: string) {
  return `${str.substring(0, 10)} ${str.substring(11, 16)}`
}
