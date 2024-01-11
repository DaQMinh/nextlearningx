import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';

import React from 'react'

function Page() {
  return (
    <div>
    <MediaPlayer title="Sprite Fight" src="youtube/_cMxraX_5RE">
    <MediaProvider />
    <DefaultVideoLayout thumbnails="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/storyboard.vtt" icons={defaultLayoutIcons} />
    </MediaPlayer>
    </div>
  )
}

export default Page