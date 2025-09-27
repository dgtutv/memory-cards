'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// Create a theme instance
const theme = createTheme({
  // You can customize your theme here
  palette: {
    mode: 'light',
  },
});

// Create emotion cache
const cache = createCache({ key: 'css', prepend: true });

export default function MUIThemeProvider({ children }) {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}