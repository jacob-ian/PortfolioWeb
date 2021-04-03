import { Exception } from './exception';

export class Utils {
  private static months = {
    0: 'jan',
    1: 'feb',
    2: 'mar',
    3: 'apr',
    4: 'may',
    5: 'jun',
    6: 'jul',
    7: 'aug',
    8: 'sep',
    9: 'oct',
    10: 'nov',
    11: 'dec',
  };

  private static alphabet = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    o: 15,
    p: 16,
    q: 17,
    r: 18,
    s: 19,
    t: 20,
    u: 21,
    v: 22,
    w: 23,
    x: 24,
    y: 25,
    z: 26,
  };

  public static formatTimeMsToMMMYYYY(timeMilliseconds: number): string {
    let date = new Date(timeMilliseconds);
    let month = Utils.getMonthLetters(date);
    let year = date.getFullYear();
    return `${month} ${year}`;
  }

  private static getMonthLetters(date: Date): string {
    let number = date.getMonth();
    let month = Utils.convertMonthNumToLetters(number);
    return month;
  }

  private static convertMonthNumToLetters(monthNumber: number): string {
    if (monthNumber < 0 || monthNumber > 11) {
      throw new Exception(
        'UTIL',
        'invalid-input',
        'Date month number out of range.'
      );
    }
    return Utils.months[monthNumber];
  }

  public static sortStringsAlphabetically(strings: string[]): string[] {
    return strings.sort((a, b) => {
      return Utils.alphabet[a[0]] - Utils.alphabet[b[0]];
    });
  }
}
