import React, { useEffect, useState } from 'react';
import { getTopArtists } from '../clients/SpotifyClient';
//import ArtistCard from '../components/ArtistCard';
import ArtistCard from '../components/ArtistCardNoMUI';
import styles from '../components/TopArtists.module.css';


const TopArtists = (props) => {
  const [artists, setArtists] = useState();
  const [count, setCount] = useState(0);

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
    } else if (index === 0) {
        return "first-artist";
    }
  };

  const deleteFirstArtist = () => {
    let newArtists = artists.slice(1);
    setArtists(newArtists);
  };

  return (
    <div>
      <div className='display-outer-container'>
        <div className='display-inner-container'>
        <button
          className="artist-delete-button"
          onClick={deleteFirstArtist}
        > 
          Delete First
        </button>
          <div className='grid-container'>
            {artists && artists.map((artist, index) => 
                <div 
                  className='grid-item' 
                  key={artist.name}
                >
                  <div className={styles["card-wrapper"]}>
                    <div className={styles["card-index"]}>{index + 1}</div>
                    <ArtistCard
                      className={assignId(artists, index)}
                      artistInfo={artist}
                    />
                  </div>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopArtists;