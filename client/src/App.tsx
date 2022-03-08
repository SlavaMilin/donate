import { Container, CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Donate } from './Donate/Donate';
const queryClient = new QueryClient();

export const App: FC = () => {
  return (
    <>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>
          <Container sx={{ pt: 4, pb: 4 }}>
            <Donate />
          </Container>
        </SnackbarProvider>
      </QueryClientProvider>
    </>
  );
};
