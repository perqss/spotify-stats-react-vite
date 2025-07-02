import { useContext, useEffect, useState } from "react";
import { PlaybackStateContext } from "./PlaybackProvider";

const BottomBar = () => {
  const context = useContext(PlaybackStateContext);
  console.log('bottom bar')

  const chooseSrc = () => {
    if (context.songId) {
        return `https://open.spotify.com/embed/track/${context.songId}?utm_source=generator`;
    } else if (context.artistId) {
        return `https://open.spotify.com/embed/artist/${context.artistId}?utm_source=generator`;
    } else if (context.albumId) {
        return `https://open.spotify.com/embed/album/${context.albumId}?utm_source=generator`;
    }
    return '';
  };

  return (
    <div>
        {context.open && <div style={{marginTop: '100px'}}>
            <iframe
                style={{
                    position: 'fixed',
                    width: '100%',
                    borderRadius: '12px',
                    bottom: '-70px',
                }}
                src={chooseSrc()}
                frameBorder="0" 
                allowFullScreen="" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                title="Spotify Player"
            ></iframe>
            <button 
                style={{
                    bottom: '70px',
                    left: '0px',
                    padding: '10px',
                    position: 'fixed',
                    border: 'none',
                    backgroundColor: 'inherit',
                }}
                onClick={() => context.setState(s => ({...s, open: false}))}
                className="material-icons close-iframe"
            >
                cancel
            </button>
        </div>}
    </div>
  )
}

export default BottomBar;