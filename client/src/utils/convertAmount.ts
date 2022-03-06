interface ConvertAmount {
  prevRate: number;
  newRate: number;
  amount: number;
}
export const convertAmount = ({ prevRate, newRate, amount }: ConvertAmount) => {
  const convertedAmount = Math.round((amount / prevRate) * newRate);
  return convertedAmount;
};
