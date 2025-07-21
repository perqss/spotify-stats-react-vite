import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { spotifyGreen } from '../common';
import { PlaybackAPIContext } from './PlaybackProvider';

const ArtistCard = ({ className, artistInfo, handleClickFollowBtnParent }) => {
  const context = useContext(PlaybackAPIContext);
  const navigate = useNavigate();

  const handleClickPlayBtn = (e) => {
    e.stopPropagation();
    context.playArtist(artistInfo.id);
  };

  const handleClickArtist = () => {
    navigate(`/artist/${artistInfo.id}`);
  };

  const handleClickFollowBtn = async (event) => {
    event.stopPropagation();
    await handleClickFollowBtnParent(artistInfo);
  };

  return (
    <div className={`${className} artist-card`}>
        <div className="artist-album-card" onClick={handleClickArtist}>
            <img className="artist-album-image" src={artistInfo.images[0].url} alt={artistInfo.name} />
            <div className="artist-album-info">
                <p className="artist-album-name">{`${artistInfo.name}`}</p>
            </div>
            <div>
              <button 
                  className="material-icons play-button" 
                  onClick={handleClickPlayBtn}
                  title="Play"
                >
                    play_circle
                </button>
                <button 
                  className={`material-icons follow-button ${artistInfo.isFollowing ? 'followed' : 'not-followed'}`} 
                  style={{backgroundColor: 'inherit', color: artistInfo.isFollowing ? spotifyGreen : 'white'}}
                  onClick={handleClickFollowBtn}
                  title="Follow"
                >
                  favorite
                </button>
            </div>
        </div>
    </div>
  );
};

export default ArtistCard;