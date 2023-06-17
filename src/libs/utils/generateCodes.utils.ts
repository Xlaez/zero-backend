class UniqueCodes {
  static sixDigitsCode = (): string => {
    const strOne = Date.now().toString(36);
    const strTwo = Math.random().toString(36).substring(2);
    const d = strOne + strTwo;
    return d.slice(0, 4);
  };

  static fiveDigitsNum = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };
}

export default UniqueCodes;
