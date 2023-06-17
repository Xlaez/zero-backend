/**
 * This clas would be useful when determining expirations
 */
class DateUtil {
  static add24Hours(date: Date) {
    return date.setHours(date.getHours() + 24);
  }

  static add7days(date: Date) {
    return date.setDate(date.getDate() + 7);
  }

  static add14days(date: Date) {
    return date.setDate(date.getDate() + 14);
  }

  static add1month(date: Date) {
    return date.setMonth(date.getMonth() + 1);
  }

  static add6months(date: Date) {
    return date.setMonth(date.getMonth() + 6);
  }
}

export default DateUtil;
