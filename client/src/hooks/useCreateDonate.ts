import axios, { AxiosError } from 'axios';
import { CreateDonateDto } from 'dto/CreateDonateDto';
import { useSnackbar } from 'notistack';
import { useMutation } from 'react-query';

export const useCreateDonate = () => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation<void, AxiosError, CreateDonateDto>(
    (createDonateDto) => axios.post('/donate', createDonateDto),
    {
      onError: (error) => {
        if (error.response?.data?.message) {
          enqueueSnackbar(error.response.data.message, {
            variant: 'error',
          });
          return;
        }
        enqueueSnackbar('An error occurred while sending, please try again', {
          variant: 'error',
        });
      },
      onSuccess: () => {
        enqueueSnackbar('Thank you for your donation!', {
          variant: 'success',
        });
      },
    },
  );
};
