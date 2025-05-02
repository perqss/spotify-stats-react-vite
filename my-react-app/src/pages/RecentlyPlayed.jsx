import { useState, useEffect } from 'react';
import { getRecentlyPlayed } from '../clients/SpotifyClient';
import Song from '../components/Song';
//import { TailSpin } from 'react-loader-spinner';


const RecentlyPlayed = (props) => {
  const [songsInfo, setSongsInfo] = useState();
  const [songId, setSongId] = useState();

  useEffect(() => {
    const getRecentlyPlayedWrapper = async () => {
      setSongsInfo(null);
      const response = await getRecentlyPlayed();
      setSongsInfo(response.items);
    };

    getRecentlyPlayedWrapper();
  }, [])

  const handleSongClickRecentlyPlayed = (id) => {
    setSongId(id);
  };

  return (
    <div>
        <div
        className='display-outer-container'
        >
            <div
                className='display-inner-container'
            >
                <List>
                {songsInfo ? songsInfo.map((songInfo, index) => 
                    <Song
                        key={index}
                        songInfo={songInfo.track}
                        index={index + 1}
                        length={songsInfo.length}
                        handleSongClick={handleSongClickRecentlyPlayed}
                    />
                ) : 
                <div
                    className='loading'
                >
                    <TailSpin/>
                </div>
                }
                </List>
            </div>
        </div>
    </div>
  )
};

export default RecentlyPlayed;