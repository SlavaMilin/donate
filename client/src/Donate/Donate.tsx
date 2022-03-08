import { LoadingButton } from '@mui/lab';
import {
  Button,
  Grid,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { currencies } from 'constants/currencies';
import { DEFAULT_SUGGESTION } from 'constants/defaultSuggestion';
import { presets as defaultPresets } from 'constants/presets';
import { useCreateDonate } from 'hooks/useCreateDonate';
import { FC } from 'react';
import { useState } from 'react';
import { convertAmount } from 'utils/convertAmount';
import { formatAmount } from 'utils/formatAmount';
import { getRoundCurrency } from 'utils/getRoundCurrency';

export const Donate: FC = () => {
  const defaultCurrency = currencies[0];
  const { mutate, isLoading: isDonateCreating } = useCreateDonate();
  const [amount, setAmount] = useState(DEFAULT_SUGGESTION.toString());
  const [presets, setPresets] = useState(defaultPresets);
  const [currency, setCurrency] = useState(currencies[0]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ amount: parseInt(amount), currency: currency.code });
  };

  const onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    if (value === '' || value === '0') {
      return setAmount('');
    }
    const parsedValue = parseInt(value);
    if (isNaN(parsedValue)) {
      return;
    }
    setAmount(parsedValue.toString());
  };

  const onCurrencyChange = (evt: SelectChangeEvent<string>) => {
    const newCurrency = currencies.find(
      (currency) => currency.code === evt.target.value,
    );
    if (newCurrency === undefined) {
      return;
    }

    const newPresets = presets.map((preset) => {
      const presetPosition = presets.indexOf(preset);

      const convertedAmount = convertAmount({
        amount: defaultPresets[presetPosition],
        newRate: newCurrency.rate,
        prevRate: defaultCurrency.rate,
      });
      return getRoundCurrency(convertedAmount);
    });

    const isAmountInPresets = presets.includes(parseInt(amount));

    let newAmount = convertAmount({
      amount: parseInt(amount),
      newRate: newCurrency.rate,
      prevRate: currency.rate,
    });

    if (isAmountInPresets === true) {
      const presetPosition = presets.indexOf(parseInt(amount));
      const convertedAmount = convertAmount({
        amount: defaultPresets[presetPosition],
        newRate: newCurrency.rate,
        prevRate: defaultCurrency.rate,
      });
      newAmount = getRoundCurrency(convertedAmount);
    }

    setAmount(newAmount.toString());
    setCurrency(newCurrency);
    setPresets(newPresets);
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container width={350} component={Paper} sx={{ p: 2 }}>
        <Grid container item spacing={1} sx={{ mb: 2 }}>
          {presets.map((preset) => (
            <Grid item key={`${preset}-amount`} xs={4}>
              <Button
                variant={preset === parseInt(amount) ? 'contained' : 'outlined'}
                onClick={() => setAmount(preset.toString())}
                sx={{ width: '100%' }}
              >
                {currency.symbol}
                {formatAmount(preset)}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Grid container item spacing={1} sx={{ mb: 2 }}>
          <Grid item>
            <TextField
              value={amount}
              inputProps={{ min: '0', step: '1', required: true }}
              onChange={onInputChange}
              size="small"
              sx={{ width: 150 }}
            />
          </Grid>
          <Grid item>
            <Select
              size="small"
              sx={{ width: 100 }}
              onChange={onCurrencyChange}
              value={currency?.code}
            >
              {currencies?.map((currency, index) => (
                <MenuItem
                  key={`select-${currency.code}`}
                  value={currency.code}
                  selected={index === 0}
                >
                  {currency.symbol}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            type="submit"
            variant="contained"
            sx={{ width: '100%' }}
            loading={isDonateCreating}
          >
            Donate
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};
