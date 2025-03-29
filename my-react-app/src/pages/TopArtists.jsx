import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import { LOAD_AT_ONCE_LIMIT, OFFSET, lighterMainColor } from '../common';
import { getTopArtists } from '../clients/SpotifyClient';
//import ArtistCard from '../components/ArtistCard';
import ArtistCard from '../components/ArtistCardNoMUI';
import Grid from '@mui/material/Grid2';
//import { TailSpin } from 'react-loader-spinner';
import BottomBar from '../components/BottomBar';
import { SpotifyPlayButton } from '../components/MaterialComponentsCss';
//import LoadMoreButton from '../components/LoadMoreButton';
import { Button } from '@mui/material';


const TopArtists = (props) => {
  const [artists, setArtists] = useState();
  // const [loadAtOnce, setLoadAtOnce] = useState(OFFSET);
  // const [offset, setOffset] = useState(0);

  useEffect(() => {
    const getTopArtistsWrapper = async () => {
      const response = await getTopArtists(props.artistTerm);
    //   response.items.splice(OFFSET, 1);
    //   setLoadAtOnce(OFFSET);
      setArtists(response.items);
    };
    getTopArtistsWrapper();
  }, [props.artistTerm])

  // useEffect(() => {
  //   const getNextTopArtists = async () => {
  //     if (loadAtOnce > OFFSET && artistsInfo) {
  //       let offsetTemp = offset;
  //       let result = artistsInfo;
  //       let response;
  //       while (offsetTemp < loadAtOnce) {
  //         response = await getTopArtists(props.artistTerm, offsetTemp);
  //         result = result.concat(response.items);
  //         offsetTemp += OFFSET;
  //       }
  //       setArtistsInfo(result);
  //     }
  //   }

  //   getNextTopArtists();
  // }, [loadAtOnce])

  // const handleClickLoadMore = () => {
  //   setLoadAtOnce(LOAD_AT_ONCE_LIMIT);
  //   setOffset(OFFSET);
  // };

  // const handleClickChangeArttist = () => {
  //   artists[20].name = 'Changed';
  // };

  const assignId = (artists, index) => {
    if (artists.length - 1 === index) {
        return "last-artist";
    }
  }; 

  return (
    <div>
      <div 
        className='display-outer-container'
      >
        <div 
          className='display-inner-container'
        >
          {/* <Button
            onClick={handleClickChangeArttist}
          >
            Change artist
          </Button> */}
          <Grid container spacing={1}>
            {artists && artists.map((artist, index) => 
              // <Grid item key={index} xs={12} sm={6} md={2}>
                <ArtistCard
                  key={index}
                  className={assignId(artists, index)}
                  artistInfo={artist}
                  index={index + 1}
                />
              // </Grid>
              // <ArtistCard
              //     className={assignId(artists, index)}
              //     artistInfo={artist}
              //     index={index + 1}
              //   />
              // <div>
              //   <img 
              //     src={artist.images[0].url}
              //     alt={artist.name}
              //     style={{height: '100px'}}
              //   />
              //   <button
              //     className={assignId(artists, index)}
              //     key={index}
              //   >
              //     {artist.name} - {artist.popularity}
              // </button>
              // </div>
            )}
          </Grid>
          
          {/* // artistsInfo && loadAtOnce < LOAD_AT_ONCE_LIMIT && 
          //   <LoadMoreButton
          //     onClick={handleClickLoadMore}
          //   /> */}
            
        </div>
      </div>
    </div>
  )
}

export default TopArtists;