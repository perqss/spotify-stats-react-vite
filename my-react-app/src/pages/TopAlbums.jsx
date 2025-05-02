import { useState, useEffect } from 'react';
import { getTopSongs } from '../clients/SpotifyClient';
import AlbumCard from '../components/AlbumCard';
import { OFFSET } from '../common';

const TopAlbums = ({ albumTerm }) => {
  const [songsInfo, setSongsInfo] = useState(null);
  const [albums, setAlbums] = useState(null);

  const fetchTopSongs = async () => {
    const response = await getTopSongs(albumTerm);
    return response.items;
  };

  useEffect(() => {
    fetchTopSongs().then((response) => (setSongsInfo(response)));
  }, [albumTerm])

  useEffect(() => {
    if (songsInfo) {
        let result = {}
        songsInfo.forEach((song, index) => {
            if (song.album.album_type === 'album') {
                if (!(song.album.name in result)) {
                    result[song.album.name] = {
                        indexSum: index,
                        count: 1,
                        image: song.album.images[0].url,
                        id: song.album.id,
                    }
                } else {
                    result[song.album.name].count += 1;
                    result[song.album.name].indexSum += index;
                }
            }     
        })
        const entries = Object.entries(result);
        entries.sort((a, b) => {
            // Sort by count in decreasing order
            if (b[1].count !== a[1].count) {
              return b[1].count - a[1].count;
            }
            // If count is equal, sort by indexSum in decreasing order
            return a[1].indexSum - b[1].indexSum;
        });
        setAlbums(entries);
    }
  }, [songsInfo])

  
  return (
    <div>
      <div className='display-outer-container'>
        <div className='display-inner-container'>
          <div className='grid-container'>
            {albums && albums.map((album, index) => 
                <div 
                  className='grid-item' 
                  key={album[1].id}
                >
                  <div className='card-wrapper'>
                    <div className='card-index'>{index + 1}</div>
                    <AlbumCard album={album}/>
                  </div>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
};

export default TopAlbums;