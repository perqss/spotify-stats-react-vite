import { useContext, memo, useEffect } from 'react';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { spotifyGreen } from '../common';

const ArtistCard = ({ className, artistInfo, handleClickFollowBtnParent }) => {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  const handleClickPlayBtn = (e) => {
    e.stopPropagation();
    context.setArtistId(artistInfo.id);
    context.setOpenBottomBar(true);
    context.setSongId(null);
    context.setAlbumId(null);
  };

  const handleClickArtist = () => {
    navigate(`/artist/${artistInfo.id}`);
  };

  const handleClickFollowBtn = async (event) => {
    event.stopPropagation();
    await handleClickFollowBtnParent(artistInfo);
    // switch (option) {
    //   case 'followed':
    //     await unfollowArtists([artistInfo.id]);
    //     setArtists(prevArtists => prevArtists.filter(artist => artist.id !== artistInfo.id));
    //     break;
    //   case 'top':
    //     if (!artistInfo.isFollowing) {
    //       await followArtists([artistInfo.id]);
    //     } else {
    //       await unfollowArtists([artistInfo.id]);
    //     }

    //     setArtists(prevArtists =>
    //       prevArtists.map(artist =>
    //         artist.id === artistInfo.id
    //           ? { ...artist, isFollowing: !artist.isFollowing }
    //           : artist
    //       ));
          
    //     break;
    // }
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
                  style={{backgroundColor: 'inherit'}} 
                  className="material-icons" 
                  onClick={handleClickPlayBtn}
                  title="Play"
                >
                    play_circle
                </button>
                <button 
                  className="material-icons follow-button" 
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