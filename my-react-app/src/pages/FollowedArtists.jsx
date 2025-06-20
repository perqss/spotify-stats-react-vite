import { useState, useEffect, useCallback } from "react";
import { getFollowedArtists, isFollowingArtists, unfollowArtists } from "../clients/SpotifyClient";
import ArtistCard from "../components/ArtistCardNoMUI";
import { assignArtistId } from "../common";


const FollowedArtists = () => {
    const [artists, setArtists] = useState(null);

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

    // const handleClickFollowBtnParent = useCallback(async (artist) => {
    //   await unfollowArtists([artist.id]);
    //   setArtists(prevArtists => 
    //     prevArtists.filter(tempArtist => tempArtist.id !== artist.id)
    //   )
    // }, []);

    const handleClickFollowBtnParent = async (artist) => {
      await unfollowArtists([artist.id]);
      setArtists(prevArtists => 
        prevArtists.filter(tempArtist => tempArtist.id !== artist.id)
      )
    };
    // useCallback does not limit the renders in this case if passed to ArtistCard
    // const handleClickFollowBtnParent = useCallback(
    //     async (index) => {
    //       await unfollowArtists([artists[index].id]);
    //       const newArtists = artists.filter((_, i) => i !== index);
    //       setArtists(newArtists);
    //     }, [artists]);

    // const createFollowHandler = useCallback(
    //         (index) => () => handleClickFollowBtnParent(index), [handleClickFollowBtnParent]);

    return (
        <div>
          <div className='display-outer-container'>
            <div className='display-inner-container'>
              <div className='grid-container'>
                {artists && artists.map((artist, index) => 
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
        </div>
      );
};

export default FollowedArtists;