import { useState, useEffect } from "react";
import { getFollowedArtists, isFollowingArtists, unfollowArtists } from "../clients/SpotifyClient";
import ArtistCard from "../components/ArtistCard";
import { assignArtistId } from "../common";


const FollowedArtists = () => {
    const [artists, setArtists] = useState([]);

    const fetchFollowedArtists = async () => {
        const response = await getFollowedArtists();
        return response.artists.items;
    };

    useEffect(() => {
        const fetchArtistsWrapper = async () => {
            const followedArtists = await fetchFollowedArtists();
            const artistIds = followedArtists.map((artist) => artist.id);
            const followed = await isFollowingArtists(artistIds);
            const newArtists = followedArtists.map((artist, index) => {
                return {
                    ...artist,
                    isFollowing: followed[index],
                };
            });
            setArtists(newArtists);
        };

        fetchArtistsWrapper();
    }, [])

    const handleClickFollowBtnParent = async (artist) => {
      await unfollowArtists([artist.id]);
      setArtists(prevArtists => 
        prevArtists.filter(a => a.id !== artist.id)
      )
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

export default FollowedArtists;