import { presets as defaultPresets } from 'constants/presets';
import { useState } from 'react';
import { Currency } from 'types/Currency';
import { convertAmount } from 'utils/convertAmount';
import { getRoundCurrency } from 'utils/getRoundCurrency';

export const usePresets = () => {
  const [presets, setPresets] = useState(defaultPresets);

  const convertPresets = ({
    newCurrency,
    defaultCurrency,
  }: {
    newCurrency: Currency;
    defaultCurrency: Currency;
  }) => {
    const newPresets = presets.map((preset) => {
      const presetPosition = presets.indexOf(preset);

      const convertedAmount = convertAmount({
        amount: defaultPresets[presetPosition],
        newRate: newCurrency.rate,
        prevRate: defaultCurrency.rate,
      });
      return getRoundCurrency(convertedAmount);
    });
    setPresets(newPresets);
  };

  return { presets, convertPresets };
};
