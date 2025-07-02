import Login from '../pages/Login';
import TopArtists from '../pages/TopArtists';
import TopSongs from '../pages/TopSongs';
import RecentlyPlayed from '../pages/RecentlyPlayed';
import Menu from './Menu';
import ArtistProfile from '../pages/ArtistProfile';
import SongInfo from '../pages/SongInfo';
import TopAlbums from '../pages/TopAlbums';
import AlbumInfo from '../pages/AlbumInfo';
import FollowedArtists from '../pages/FollowedArtists';
import SavedSongs from '../pages/SavedSongs';
import {
  Routes,
  Route
} from 'react-router-dom';
import { useState, memo } from 'react';

const CustomRoutes = memo(() => {
  const [artistTerm, setArtistTerm] = useState('long_term');
  const [songTerm, setSongTerm] = useState('long_term');
  const [albumTerm, setAlbumTerm] = useState('long_term');
  console.log('custom routes')

  return (
    <Routes>
        <Route path='/' element={<Login/>}/>
        <Route 
          path='/top-artists' 
          element={
            <div>
              <Menu
                componentIndex={0}
                setTerm={setArtistTerm}
              />
              <TopArtists
                artistTerm={artistTerm}
              />
            </div>
          }
        />
        <Route 
          path='/top-songs' 
          element={
            <div>
              <Menu
                componentIndex={1}
                setTerm={setSongTerm}
              />
              <TopSongs
                songTerm={songTerm}
              />
            </div>
          }/>
        <Route
          path='/top-albums'
          element={
            <div>
              <Menu
                componentIndex={2}
                setTerm={setAlbumTerm}
              />
              <TopAlbums
                albumTerm={albumTerm}
              />
            </div>
          }
        />
        <Route 
          path='/recently-played' 
          element={
            <div>
              <Menu
                componentIndex={3}
              />
              <RecentlyPlayed/>
            </div>
          }/>
        <Route
          path='/artist/:artistId'
          element={
            <div>
              <Menu
                setTerm={setArtistTerm}
                closeSubMenu
              />
              <ArtistProfile/>
            </div>
          }
        />
        <Route
          path='/song/:songId'
          element={
            <div>
              <Menu
                setTerm={setSongTerm}
                closeSubMenu
              />
              <SongInfo/>
            </div>
          }
        />
        <Route
          path='/album/:albumId'
          element={
            <div>
              <Menu
                setTerm={setAlbumTerm}
              />
              <AlbumInfo/>
            </div>
          }
        />
        <Route
          path='/followed-artists'
          element={
            <div>
              <Menu
                componentIndex={5}
              />
              <FollowedArtists/>
            </div>
          }
        />
        <Route
          path='/saved-songs'
          element={
            <div>
              <Menu
                componentIndex={6}
              />
              <SavedSongs/>
            </div>
          }
        />
      </Routes>
  );
});

export default CustomRoutes;