import React, { useState, useEffect } from 'react';
import { getTopSongs } from '../clients/SpotifyClient';
import { OFFSET } from '../common';
import Song from '../components/Song';


const TopSongs = (props) => {
  const [songsInfo, setSongsInfo] = useState();
  const [songId, setSongId] = useState();
  const [loadAtOnce, setLoadAtOnce] = useState(OFFSET);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const getTopSongsWrapper = async () => {
      const response = await getTopSongs(props.songTerm);
      setSongsInfo(response.items);
    };

    getTopSongsWrapper();
  }, [props.songTerm])

  // useEffect(() => {
  //   const getNextTopSongs = async () => {
  //     if (loadAtOnce > OFFSET && songsInfo) {
  //       let offsetTemp = offset;
  //       let result = songsInfo;
  //       let response;
  //       while (offsetTemp < loadAtOnce) {
  //         response = await getTopSongs(props.songTerm, offsetTemp);
  //         result = result.concat(response.items);
  //         offsetTemp += OFFSET;
  //       }
  //       setSongsInfo(result);
  //     }
  //   }

  //   getNextTopSongs();
  // }, [loadAtOnce])

  // const handleClickLoadMore = () => {
  //   setLoadAtOnce(LOAD_AT_ONCE_LIMIT);
  //   setOffset(OFFSET);
  // };

  return (
    <div>
      <div
        className='display-outer-container'
      >
        <div
          className='display-inner-container'
        >
          <List>
            {songsInfo && songsInfo.map((songInfo, index) => 
              <Song
                key={index}
                songInfo={songInfo}
                index={index + 1}
                length={songsInfo.length}
              />
            )}
          </List>
        </div>
      </div>
    </div>
  )
};

export default TopSongs;