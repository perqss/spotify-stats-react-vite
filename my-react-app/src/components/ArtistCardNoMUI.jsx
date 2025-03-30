import React, { useContext } from 'react';
import { mainColor } from '../common';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@mui/material';
import styles from "./Artist.module.css";

const ArtistCard = ({ className, artistInfo, index }) => {
  const setArtistId = useContext(AppContext)?.setArtistId;
  const setSongId = useContext(AppContext)?.setSongId;
  const setAlbumId = useContext(AppContext)?.setAlbumId;
  const setOpenBottomBar = useContext(AppContext)?.setOpenBottomBar;
  const navigate = useNavigate();

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
            <img className={styles["artist_image"]} src={artistInfo.images[0].url} alt={artistInfo.name} />
            <div className={styles["artist_info"]}>
                <p className={styles["artist_name"]}>{`${index}. ${artistInfo.name}`}</p>
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
}

export default ArtistCard;