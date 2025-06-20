import { useCallback, useEffect, useState } from 'react';
import { getTopArtists, isFollowingArtists, followArtists, unfollowArtists } from '../clients/SpotifyClient';
import ArtistCard from '../components/ArtistCardNoMUI';
import { assignArtistId } from '../common';

const TopArtists = ({ artistTerm }) => {
  const [artists, setArtists] = useState();

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

  // const handleClickFollowBtnParent = async (index) => {
  //   if (!artists[index].isFollowing) {
  //     await followArtists([artists[index].id]);
  //   } else {
  //     await unfollowArtists([artists[index].id]);
  //   }
  //   artists[index].isFollowing = !artists[index].isFollowing;
  //   setArtists([...artists]);
  // };

  const handleClickFollowBtnParent = useCallback(async (artist) => {
    // passing an index would not work, because artists array is undefined
    // console.log(artists, index)
    // if (!artists[index].isFollowing) {
    //   await followArtists([artists[index].id]);
    // } else {
    //   await unfollowArtists([artists[index].id]);
    // }
    // artists[index].isFollowing = !artists[index].isFollowing;
    // setArtists([...artists]);
    if (!artist.isFollowing) {
      await followArtists([artist.id]);
    } else {
      await unfollowArtists([artist.id]);
    }
    setArtists(prevArtists =>
            prevArtists.map(tempArtist => 
              tempArtist.id === artist.id
              ? { ...tempArtist, isFollowing: !artist.isFollowing }
              : tempArtist            
          ));
  }, []);

  return (
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
}

export default TopArtists;