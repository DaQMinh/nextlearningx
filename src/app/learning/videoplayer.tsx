'use client'
import { Box } from '@mui/material';
import { useSearchParams } from 'next/navigation';
export default function Video() {
  const searchParams = useSearchParams();
  const videoid = searchParams.get('id');
  if(videoid){
    return (
      <Box sx={{
        aspectRatio: '16/9',
      }}>

      </Box>
    );
  }

}
