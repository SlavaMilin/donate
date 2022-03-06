export const getRoundCurrency = (num: number) => {
  const numLength = num.toString().length;
  const exp = numLength < 3 ? 10 : 10 ** (numLength - 2);
  return Math.round(num / exp) * exp;
};
