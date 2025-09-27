import React from 'react';
import dynamic from 'next/dynamic';
import { Typography } from '@mui/material';

// Dynamically import Gifs component with no SSR to prevent hydration issues
const Gifs = dynamic(() => import('./Gifs'), {
  ssr: false,
  loading: () => <Typography variant="h2">Loading GIFs...</Typography>
});

export default function Home() {
  return (
    <Gifs />
  );
}
