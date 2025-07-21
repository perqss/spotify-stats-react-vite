import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArtist } from '../clients/SpotifyClient';
import { useNavigate } from 'react-router-dom';
import SpotifyPlayButton from '../components/SpotifyPlayButton';
import styles from '../components/ArtistProfile.module.css';

const ArtistProfile = () => {
  const { artistId } = useParams();
  const [artistInfo, setArtistInfo] = useState();
  const navigate = useNavigate();

  const fetchArtist = async () => {
    const response = await getArtist(artistId);
    return response;
  };

  useEffect(() => {
    fetchArtist().then(response => setArtistInfo(response));
  }, [])
  
  return (
    <>
        <button
            className="material-icons back-button"
            onClick={() => navigate(-1)} 
        >
            arrow_back_ios
        </button>
        {
            artistInfo && 
            <div
                className={styles["artist-profile-display"]}
            >
                <img
                    src={artistInfo.images[0].url}
                    alt="Artist Cover"
                    className={styles["artist-image"]}
                />
                <div className={styles["info-card"]}>
                    <div className={styles["info-text"]}>
                        {artistInfo.followers.total} followers
                    </div>
                </div>
                <div className={styles["genres-container"]}>
                    {artistInfo.genres.map(genre => 
                        <div className={styles["info-card"]} key={genre}>
                            <div className={styles["info-text"]}>
                                {genre}
                            </div>
                        </div>
                    )}
                </div>
                <SpotifyPlayButton 
                    href={artistInfo.external_urls.spotify} 
                    target="_blank"
                    text="Play on Spotify"
                />
            </div>
        }
    </>
  );
};

export default ArtistProfile;