import { getSavedTracks, areTracksSaved, removeSavedTracks } from "../clients/SpotifyClient";
import Song from "../components/Song";
import { assignSongId } from "../common";
import React, { useEffect, useState, Fragment, useCallback } from "react";

const SavedSongs = () => {
    const [songs, setSongs] = useState(null);

    const fetchSavedTracks = async () => {
        const response = await getSavedTracks();
        return response.items;
    };

    useEffect(() => {
        const fetchSongsWrapper = async () => {
            const savedTracks = await fetchSavedTracks();
            const songIds = savedTracks.map((song) => song.track.id);
            const saved = await areTracksSaved(songIds);
            const newSongs = savedTracks.map((song, index) => {
                return {
                    ...song.track,
                    isSaved: saved[index],
                };
            });
            setSongs(newSongs);
        };

        fetchSongsWrapper();
    }, [])

    const handleClickSaveBtnParent = useCallback(async (song) => {
        await removeSavedTracks([song.id]);
        setSongs(prevSongs => 
            prevSongs.filter(s => s.id !== song.id)
        )
    }, []);

    return (
        <div>
          <div className='display-outer-container'>
            <div className='display-inner-container'>
              <div className='song-container'>
                {songs && songs.map((song, index) =>
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
        </div>
    )
};

export default SavedSongs;