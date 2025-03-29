import React, { useContext } from 'react';
import { mainColor } from '../common';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@mui/material';

const ArtistCard = (props) => {
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
    navigate(`/artist/${props.artistInfo.id}`);
  };

  return (
    <div className={props.className}>
        <div className="artist-card" onClick={handleClickArtist}>
            <img className="artist-image" src={props.artistInfo.images[0].url} alt={props.artistInfo.name} />
            <div className="artist-info">
                <p className="artist-name">{`${props.index}. ${props.artistInfo.name}`}</p>
            </div>
            <button style={{backgroundColor: 'inherit'}} onClick={handleClickPlayBtn}>
                <Icon>play_circle</Icon>
            </button>
        </div>
    </div>
  );
}

export default ArtistCard;