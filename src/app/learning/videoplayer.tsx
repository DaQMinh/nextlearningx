'use client'
import { Box } from '@mui/material';
import { useSearchParams } from 'next/navigation';

export default function Video() {
  const searchParams = useSearchParams();
  const videoid = searchParams.get('id');
  if(videoid){
    return (
      <Box sx={{
        overflow: 'hidden',
        width: '100%',
        height : '800',
        aspectRatio: '16/9',
        pointerEvents: 'none',
      
        '& iframe': {
          width: '300%',
          height: '100%',
          marginLeft: '-100%',
        },
      }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoid}?autoplay=1&loop=1&color=white&controls=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1`} 
          title="YouTube video player" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Box>
    );
  }

}
