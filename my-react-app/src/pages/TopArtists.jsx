import { useEffect, useState } from 'react';
import { getTopArtists, isFollowingArtists, followArtists, unfollowArtists } from '../clients/SpotifyClient';
import ArtistCard from '../components/ArtistCard';
import { assignArtistId } from '../common';

const TopArtists = ({ artistTerm }) => {
  const [artists, setArtists] = useState([]);

  const fetchTopArtists = async () => {
    const response = await getTopArtists(artistTerm);
    return response.items;
  };

  useEffect(() => {
        const fetchArtistsWrapper = async () => {
            const topArtists = await fetchTopArtists();
            const artistIds = topArtists.map(artist => artist.id);
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

  const handleClickFollowBtnParent = async (artist) => {
    if (!artist.isFollowing) {
      await followArtists([artist.id]);
    } else {
      await unfollowArtists([artist.id]);
    }
    setArtists(prevArtists =>
            prevArtists.map(a => 
              a.id === artist.id
              ? { ...a, isFollowing: !artist.isFollowing }
              : a            
          ));
  };

  return (
      <div className='display-outer-container'>
        <div className='display-inner-container'>
          <div className='grid-container'>
            {artists.map((artist, index) => 
                <div 
                  className='grid-item' 
                  key={artist.id}
                >
                  <div className='card-wrapper'>
                    <div className='card-index'>{index + 1}</div>
                    <ArtistCard
                      className={assignArtistId(artists, index)}
                      artistInfo={artist}
                      handleClickFollowBtnParent={handleClickFollowBtnParent}
                    />
                  </div>
                </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default TopArtists;