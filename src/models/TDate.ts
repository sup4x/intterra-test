export default class TDate {
    year: number; // Год
    month: number; // Месяц 1 - 12
    day: number; // День месяца 1 - 31

    constructor (args: TDate) {
      const { year, month, day } = args
      this.year = year
      this.month = month
      this.day = day
    }
}

export function dateFromTDate (tdate : TDate): Date {
  const { year, month, day } = tdate
  return new Date(year, month, day)
}

export const DEFAULT_DATE_FORMAT = 'd MMM yyyy'
