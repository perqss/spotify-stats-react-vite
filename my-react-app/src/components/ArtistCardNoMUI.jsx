import { useContext, memo, useEffect, useCallback } from 'react';
//import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { spotifyGreen } from '../common';
import { PlaybackAPIContext } from './PlaybackProvider';

const ArtistCard = memo(({ className, artistInfo, handleClickFollowBtnParent }) => {
  console.log('artist card');
  const context = useContext(PlaybackAPIContext);
  const navigate = useNavigate();
  const handleClickPlayBtn = useCallback((e) => {
    e.stopPropagation();
    // context.setArtistId(artistInfo.href.split('/').pop());
    // context.setOpenBottomBar(true);
    // context.setSongId(null);
    // context.setAlbumId(null);
    context.playArtist(artistInfo.id);
  }, []);

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
});

export default ArtistCard;