'use client'
import { Box } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
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
      }}>
        <MediaPlayer src={`youtube/${videoid}`} >
        <MediaProvider />
        <DefaultVideoLayout thumbnails="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/storyboard.vtt" icons={defaultLayoutIcons} />
        </MediaPlayer>
      </Box>
    );
  }

}
