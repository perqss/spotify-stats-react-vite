import { useState, useEffect, Fragment } from 'react';
import { getTopSongs, areTracksSaved, saveTracks, removeSavedTracks } from '../clients/SpotifyClient';
import Song from '../components/Song';
import { assignSongId } from '../common';


const TopSongs = ({ songTerm }) => {
  const [songs, setSongs] = useState([]);

  const fetchTopSongs = async () => {
    const response = await getTopSongs(songTerm);
    return response.items;
  };

  useEffect(() => {
    const fetchSongsWrapper = async () => {
      const topSongs = await fetchTopSongs();
      const songIds = topSongs.map((song) => song.id);
      const saved = await areTracksSaved(songIds);
      const newSongs = topSongs.map((song, index) => {
        return {
          ...song,
          isSaved: saved[index],
        };
      });
      setSongs(newSongs);
    };

    fetchSongsWrapper();
  }, [songTerm])

  const handleClickSaveBtnParent = async (song) => {
    if (song.isSaved) {
      await removeSavedTracks([song.id]);
    } else {
      await saveTracks([song.id]);
    }
    setSongs(prevSongs => 
      prevSongs.map(s =>
        s.id === song.id
          ? { ...s, isSaved: !s.isSaved }
          : s
      )
    )
  };

  return (
    <div className='display-outer-container'>
      <div className='display-inner-container'>
        <div className='song-container'>
          {songs.map((song, index) =>
            <Fragment key={song.id}>
                <div>{index + 1}.</div>
                <Song
                  className={assignSongId(songs, index)}
                  songInfo={song}
                  handleClickSaveBtnParent={handleClickSaveBtnParent}
                />
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopSongs;