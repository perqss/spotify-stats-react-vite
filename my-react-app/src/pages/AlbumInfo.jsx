import { getReleaseDateYear, parseArtists } from '../common';
import { getAlbum, areTracksSaved, saveTracks, removeSavedTracks } from '../clients/SpotifyClient';
import { useNavigate, useParams } from 'react-router-dom'; 
import Song from '../components/Song';
import SpotifyPlayButton from '../components/SpotifyPlayButton';
import styles from '../components/AlbumInfo.module.css';
import { Fragment, useState, useEffect } from 'react';

const AlbumInfo = () => {
  const navigate = useNavigate();
  const { albumId } = useParams();
  const [albumInfo, setAlbumInfo] = useState();

  const fetchAlbum = async () => {
    const response = await getAlbum(albumId);
    return response;
  };

  useEffect(() => {
    const fetchAlbumWrapper = async () => {
      const album = await fetchAlbum();
      const songIds = album.tracks.items.map(track => track.id);
      const saved = await areTracksSaved(songIds);
      const newAlbumInfo = {
        ...album,
        tracks: {
          ...album.tracks,
          items: album.tracks.items.map((track, index) => ({
            ...track,
            isSaved: saved[index],
          })),
        }
      };

      setAlbumInfo(newAlbumInfo);
    };

    fetchAlbumWrapper();
  }, [])

  const handleClickSaveBtnParent = async (song) => {
    if (!song.isSaved) {
      await saveTracks([song.id]);
    } else {
      await removeSavedTracks([song.id]);
    }
    setAlbumInfo(prevAlbum => ({
      ...prevAlbum,
      tracks: {
        ...prevAlbum.tracks,
        items: prevAlbum.tracks.items.map(track =>
          track.id === song.id
            ? { ...track, isSaved: !track.isSaved }
            : track
        ),
      },
    }));
  };

  return (
    <>
      <button 
          className="back-button material-icons" 
          onClick={() => navigate(-1)}
      >
          arrow_back_ios
      </button>
      {
        albumInfo && 
          <div className={styles["album-display"]}>
            <div className={styles["album-header"]}>
                <img 
                    className="cover-display"
                    src={albumInfo.images[1].url}
                    alt="Album Cover"
                />

                <div className="song-album-info">
                    <div className={styles["album-title"]}>
                        {albumInfo.name}
                    </div>
                    <div className={styles["album-artist"]}>
                        {parseArtists(albumInfo.artists)}
                    </div>
                    <div className={styles["album-label"]}>
                        {albumInfo.label}
                    </div>
                    {albumInfo.genres.map(genre => 
                        <div className={styles["album-genre"]} key={genre}>
                          {genre}
                        </div>
                    )}
                    <div className={styles["album-year"]}>
                        {getReleaseDateYear(albumInfo.release_date)}
                    </div>
                    <SpotifyPlayButton
                        text="Play on Spotify"
                        href={albumInfo.external_urls.spotify}
                        target="_blank"
                    />
                </div>
            </div>
            <div className={styles["tracks-header"]}>
                Album tracks
            </div>
            <div className={styles["tracks-list"]}>
                  {albumInfo.tracks.items.map((song, index) =>
                  <Fragment key={song.id}>
                    <div>{index + 1}.</div>
                    <Song
                      albumCover={albumInfo.images[1].url}
                      songInfo={song}
                      handleClickSaveBtnParent={handleClickSaveBtnParent}
                    />
                  </Fragment>
                  )}
            </div>
        </div>
      }
    </>
  );
};

export default AlbumInfo;