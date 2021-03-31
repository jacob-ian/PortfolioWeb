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
}
