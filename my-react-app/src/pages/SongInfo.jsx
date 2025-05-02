import { useEffect, useState, Fragment } from 'react';
import { getReleaseDateYear, parseArtists } from '../common';
import { getTrack } from '../clients/SpotifyClient';
import { useParams, useNavigate } from 'react-router-dom';
import SpotifyPlayButton from '../components/SpotifyPlayButton';
import styles from '../components/SongInfo.module.css';

const SongInfo = () => {
  const { songId } = useParams();
  const [songInfo, setSongInfo] = useState();
  const navigate = useNavigate();

  const fetchSong = async () => {
    const response = await getTrack(songId);
    return response;
  };

  useEffect(() => {
    fetchSong().then(response => setSongInfo(response));
  }, [])
  
  return (
    <Fragment>
      <button
        className="material-icons back-button"
        onClick={() => navigate(-1)}
      >
        arrow_back_ios
      </button>
      {
        songInfo && 
        <div className={styles["song-display"]}>
          <div className={styles["song-content-row"]}>
              <img 
                  className="cover-display"
                  src={songInfo.album.images[0].url}
                  alt="Album cover"
              />
              <div className={styles["song-details"]}>
                  <div className={styles["song-name"]}>
                      {songInfo.name}
                  </div>
                  <div className={styles["album-name"]}>
                      {songInfo.album.name}
                  </div>
                  <div className={styles["artist-names"]}>
                      {parseArtists(songInfo.artists)}
                  </div>
                  <div className={styles["release-year"]}>
                      {getReleaseDateYear(songInfo.album.release_date)}
                  </div>
                  <SpotifyPlayButton 
                      text="Play on Spotify"
                      href={songInfo.external_urls.spotify}
                      target="_BLANK"
                  />
              </div>
          </div>
      </div>
      }
    </Fragment>
  )
};

export default SongInfo;