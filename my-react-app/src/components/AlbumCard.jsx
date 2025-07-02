import { useContext } from 'react';
import { mainColor } from '../common';
//import { AppContext } from '../App';
import { PlaybackAPIContext } from './PlaybackProvider';
import { useNavigate } from 'react-router-dom';

const AlbumCard = ({ album }) => {
    const context = useContext(PlaybackAPIContext);
    const navigate = useNavigate();

    const handleClickAlbum = () => {
      navigate(`/album/${album[1].id}`);
    };

    const handleClickPlayBtn = (event) => {
        event.stopPropagation();
        context.setAlbumId(album[1].href.split('/').pop());
        context.setOpenBottomBar(true);
        context.setSongId(null);
        context.setArtistId(null);
    };

    return (
        <div className="artist-album-card" onClick={handleClickAlbum}>
          <img className="artist-album-image" src={album[1].image} alt={album[0]} />
          <div className="artist-album-info">
              <p className="artist-album-name">{`${album[0]}`}</p>
          </div>
          <div>
            <button 
              className="material-icons" 
              style={{
                backgroundColor: 'inherit'
              }} 
              onClick={handleClickPlayBtn} 
              title="Play"
            >
              play_circle
            </button>
          </div>
        </div>
      );
};

export default AlbumCard;