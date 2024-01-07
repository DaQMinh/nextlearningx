'use client'
import { CssBaseline } from '@mui/material';
import { ThemeProvider , createTheme } from '@mui/material/styles';

const darkTheme = createTheme({

    palette: {
      mode: 'dark',
    },
});

export default function Theme({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
    )
  }