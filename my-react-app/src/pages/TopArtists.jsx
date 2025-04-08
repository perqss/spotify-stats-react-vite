import React, { useEffect, useState } from 'react';
import { getTopArtists, isFollowingArtists, followArtists, unfollowArtists } from '../clients/SpotifyClient';
//import ArtistCard from '../components/ArtistCard';
import ArtistCard from '../components/ArtistCardNoMUI';

const TopArtists = ({ artistTerm }) => {
  const [artists, setArtists] = useState();

  const fetchTopArtists = async (term) => {
    const response = await getTopArtists(term);
    return response.items;
  };

  useEffect(() => {
        const fetchArtistsWrapper = async () => {
            const topArtists = await fetchTopArtists(artistTerm);
            const artistIds = topArtists.map((artist) => artist.id);
            const followed = await isFollowingArtists(artistIds);
            const newArtists = topArtists.map((artist, index) => {
                return {
                    ...artist,
                    isFollowing: followed[index],
                };
            });
            setArtists(newArtists);
        };

        fetchArtistsWrapper();
  }, [artistTerm])

  const assignId = (artists, index) => {
    if (artists.length - 1 === index) {
        return "last-artist";
    } else if (index === 0) {
        return "first-artist";
    }
  };

  const handleClickFollowBtnParent = async (index) => {
    if (!artists[index].isFollowing) {
      await followArtists([artists[index].id]);
    } else {
      await unfollowArtists([artists[index].id]);
    }
    artists[index].isFollowing = !artists[index].isFollowing;
    setArtists([...artists]);
  };

  return (
    <div>
      <div className='display-outer-container'>
        <div className='display-inner-container'>
          <div className='grid-container'>
            {artists && artists.map((artist, index) => 
                <div 
                  className='grid-item' 
                  key={artist.name}
                >
                  <div className='card-wrapper'>
                    <div className='card-index'>{index + 1}</div>
                    <ArtistCard
                      className={assignId(artists, index)}
                      artistInfo={artist}
                      handleClickFollowBtnParent={() => handleClickFollowBtnParent(index)}
                    />
                  </div>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopArtists;