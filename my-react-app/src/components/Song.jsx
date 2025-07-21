import { useContext } from 'react';
import { PlaybackAPIContext } from './PlaybackProvider';
import { useNavigate } from 'react-router-dom';
import { grey, parseArtists, durationInHrMinSec } from '../common';
import styles from './Song.module.css';
import Waveform from './Waveform';

const Song = ({ className, songInfo, albumCover, handleClickSaveBtnParent }) => {
    const context = useContext(PlaybackAPIContext);
    const navigate = useNavigate();

    const handleSecondary = () => {
        if (albumCover) {
            return `${parseArtists(songInfo.artists)}`;
        } else {
            return `${parseArtists(songInfo.album.artists)} - ${songInfo.album.name}`;
        }
    }

    const handleClickPlayBtn = (e) => {
      e.stopPropagation();
      context.playSong(songInfo.id);
    };

    const handleClickSaveBtn = async (event) => {
        event.stopPropagation();
        await handleClickSaveBtnParent(songInfo);
    };

    const handleSongClick = () => {
        navigate(`/song/${songInfo.id}`);
    };
  
  return (
    <div className={`${className} song-card`}>
        <div className={styles["song-item"]} onClick={handleSongClick}>
            <div className={styles["song-left"]}>
                <img
                    className={styles["song-graphic"]}
                    src={albumCover ? albumCover : songInfo.album.images[2].url}
                    alt="Cover art"
                />
                <div className={styles["song-text"]}>
                    <div className={styles["primary-text"]}>{songInfo.name}</div>
                    <div 
                        className={styles["secondary-text"]} 
                        style={{
                            color: {grey}
                        }}
                    >
                        {handleSecondary()}
                    </div>
                </div>
            </div>
            <div className={styles["meta-controls"]}>
                <button 
                    className={`material-icons save-button ${songInfo.isSaved ? 'saved' : 'not-saved'}`} 
                    style={{backgroundColor: 'inherit', color: songInfo.isSaved ? 'yellow' : 'white'}}
                    onClick={handleClickSaveBtn}
                    title={songInfo.isSaved ? "Remove from Library" : "Add to Library"}
                > 
                    bookmark_add
                </button>
                <button 
                    className="material-icons play-button"
                    onClick={handleClickPlayBtn}
                    title="Play"
                >
                    play_circle
                </button>
                <div className={styles["duration"]}>{durationInHrMinSec(songInfo.duration_ms)}</div>
            </div>
        </div>
        <Waveform songId={songInfo.id}/>
    </div>
)};

export default Song;