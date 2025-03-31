import React, { useContext } from 'react';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';
import styles from "./Artist.module.css";

const ArtistCard = ({ className, artistInfo }) => {
  const setArtistId = useContext(AppContext)?.setArtistId;
  const setSongId = useContext(AppContext)?.setSongId;
  const setAlbumId = useContext(AppContext)?.setAlbumId;
  const setOpenBottomBar = useContext(AppContext)?.setOpenBottomBar;
  const navigate = useNavigate();
  console.log('render')
  const handleClickPlayBtn = (e) => {
    e.stopPropagation();
    setArtistId(props.artistInfo?.id);
    setOpenBottomBar(true);
    setSongId(null);
    setAlbumId(null);
  };

  const handleClickArtist = () => {
    navigate(`/artist/${artistInfo.id}`);
  };

  return (
    <div className={className}>
        <div className={styles["artist-card"]} onClick={handleClickArtist}>
            <img className={styles["artist-image"]} src={artistInfo.images[0].url} alt={artistInfo.name} />
            <div className={styles["artist-info"]}>
                <p className={styles["artist-name"]}>{`${artistInfo.name}`}</p>
            </div>
            <button 
                style={{backgroundColor: 'inherit'}} 
                className="material-icons" 
                onClick={handleClickPlayBtn}
            >
                play_circle
            </button>
        </div>
    </div>
  );
};

export default ArtistCard;