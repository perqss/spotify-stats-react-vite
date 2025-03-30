import React, { useEffect, useState } from 'react';
import { getTopArtists } from '../clients/SpotifyClient';
//import ArtistCard from '../components/ArtistCard';
import ArtistCard from '../components/ArtistCardNoMUI';


const TopArtists = (props) => {
  const [artists, setArtists] = useState();

  useEffect(() => {
    const getTopArtistsWrapper = async () => {
      const response = await getTopArtists(props.artistTerm);
      setArtists(response.items);
    };

    getTopArtistsWrapper();
  }, [props.artistTerm])

  const assignId = (artists, index) => {
    if (artists.length - 1 === index) {
        return "last-artist";
    }
  }; 

  return (
    <div>
      <div className='display-outer-container'>
        <div className='display-inner-container'>
          <div className='grid-container'>
            {artists && artists.map((artist, index) => 
                <div 
                  className='grid-item' 
                  key={index}
                >
                  <ArtistCard
                    className={assignId(artists, index)}
                    artistInfo={artist}
                    index={index + 1}
                  />
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopArtists;