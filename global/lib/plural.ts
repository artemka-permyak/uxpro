/**
 * Склонения
 * @param num
 * @param postfixes
 */
export default function plural(num: number, postfixes: [string, string, string]) {
  if (!num && isNaN(num)) {
    return '';
  }

  const cases = [2, 0, 1, 1, 1, 2];

  return postfixes[num % 100 > 4 && num % 100 < 20 ? 2 : cases[Math.min(num % 10, 5)]];
}
