// playbackContext.js
import { createContext, useMemo, useState } from "react";

export const PlaybackAPIContext = createContext(null); // stabilna referencja
export const PlaybackStateContext = createContext(null); // zmienna referencja

export function PlaybackProvider({ children }) {
  const [state, setState] = useState({
    songId: null, artistId: null, albumId: null, open: false
  });

  const api = useMemo(() => ({
    playArtist: id => setState({ songId: null, albumId: null, artistId: id, open: true }),
    playSong:   id => setState({ artistId: null, albumId: null, songId: id, open: true }),
    playAlbum:  id => setState({ songId: null, artistId: null, albumId: id, open: true }),
    closeBar: () => setState({ songId: null, artistId: null, albumId: null, open: false })
  }), []); 

  return (
    <PlaybackAPIContext.Provider value={api}>
      <PlaybackStateContext.Provider value={{...state, setState}}>
        {children}
      </PlaybackStateContext.Provider>
    </PlaybackAPIContext.Provider>
  );
}

export default PlaybackProvider;