import { Container, CssBaseline } from '@mui/material';
import axios from 'axios';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Donate } from './Donate/Donate';
const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:4000';
const queryClient = new QueryClient();
axios.defaults.baseURL = baseUrl;

export const App = () => {
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
