import { useState, useEffect, useCallback, Fragment } from 'react';
import { getRecentlyPlayed, areTracksSaved, saveTracks, removeSavedTracks } from '../clients/SpotifyClient';
import Song from '../components/Song';
import { assignSongId } from '../common';

const RecentlyPlayed = () => {
  const [songs, setSongs] = useState(null);

  const fetchRecentlyPlayed = async () => {
    const response = await getRecentlyPlayed();
    return response.items;
  };

  useEffect(() => {
    const fetchSongsWrapper = async () => {
      const recentlyPlayedSongs = await fetchRecentlyPlayed();
      const trackIds = recentlyPlayedSongs.map(({ context, track }) => track.id);
      const saved = await areTracksSaved(trackIds);
      const newSongs = recentlyPlayedSongs.map((item, index) => {
        return {
          ...item,
          track: {
            ...item.track,
            isSaved: saved[index],
          }
        };
      });
      setSongs(newSongs);
    };

    fetchSongsWrapper();
  }, [])

  const handleClickSaveBtnParent = useCallback(async (song) => {
    if (!song.isSaved) {
      await saveTracks([song.id]);
    } else {
      await removeSavedTracks([song.id]);
    }
    setSongs(prevSongs => 
      prevSongs.map(s =>
        s.track.id === song.id
          ? { ...s, track: { ...s.track, isSaved: !s.track.isSaved } }
          : s
      )
    )
  }, [])

  return (
    <div className='display-outer-container'>
      <div className='display-inner-container'>
        <div className='song-container'>
          {songs && songs.map((song, index) =>
            <Fragment key={song.played_at}>
                <div>{index + 1}.</div>
                <Song
                  className={assignSongId(songs, index)}
                  songInfo={song.track}
                  handleClickSaveBtnParent={handleClickSaveBtnParent}
                />
            </Fragment>
          )}
        </div>
      </div>
    </div>
  )
};

export default RecentlyPlayed;