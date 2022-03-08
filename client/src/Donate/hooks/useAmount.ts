import { DEFAULT_SUGGESTION } from 'constants/defaultSuggestion';
import { presets as defaultPresets } from 'constants/presets';
import { useState } from 'react';
import { Currency } from 'types/Currency';
import { convertAmount as convertAmountData } from 'utils/convertAmount';
import { getRoundCurrency } from 'utils/getRoundCurrency';

interface SetAmount {
  newCurrency: Currency;
  currency: Currency;
  defaultCurrency: Currency;
  presets: number[];
}

export const useAmount = () => {
  const [amount, setAmount] = useState(DEFAULT_SUGGESTION.toString());

  const convertAmount = ({
    newCurrency,
    currency,
    defaultCurrency,
    presets,
  }: SetAmount) => {
    const isAmountInPresets = presets.includes(parseInt(amount));

    let newAmount = convertAmountData({
      amount: parseInt(amount),
      newRate: newCurrency.rate,
      prevRate: currency.rate,
    });

    if (isAmountInPresets === true) {
      const presetPosition = presets.indexOf(parseInt(amount));
      const convertedAmount = convertAmountData({
        amount: defaultPresets[presetPosition],
        newRate: newCurrency.rate,
        prevRate: defaultCurrency.rate,
      });
      newAmount = getRoundCurrency(convertedAmount);
    }
    setAmount(newAmount.toString());
  };

  return { amount, setAmount, convertAmount };
};
