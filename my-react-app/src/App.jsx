import { useState, createContext } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Login from './pages/Login';
import TopArtists from './pages/TopArtists';
import TopSongs from './pages/TopSongs';
import RecentlyPlayed from './pages/RecentlyPlayed';
import BottomBar from './components/BottomBar';
import Menu from './components/Menu';
import ArtistProfile from './pages/ArtistProfile';
import SongInfo from './pages/SongInfo';
import TopAlbums from './pages/TopAlbums';
import AlbumInfo from './pages/AlbumInfo';
import FollowedArtists from './pages/FollowedArtists';
import SavedSongs from './pages/SavedSongs';

// po kliknięciu 'play' następuje re-render App.jsx i konkretny komponent Route również się re renderuje a wraz nim potencjalnie cała lista artystów, piosenek itp.
// żeby temu zapobiec trzeba prawdopodobnie zmienić strukturę komponentów, tzn. useState() definiować w TopSongs, TopArtists itp. bo nie da się dać memo na Route  - można by o tym napisać w pracy

export const AppContext = createContext();

function App() {
  const [songId, setSongId] = useState();
  const [artistId, setArtistId] = useState();
  const [albumId, setAlbumId] = useState();
  const [openBottomBar, setOpenBottomBar] = useState(false);
  const [artistTerm, setArtistTerm] = useState('long_term');
  const [songTerm, setSongTerm] = useState('long_term');
  const [albumTerm, setAlbumTerm] = useState('long_term');

  return (
    <Router>
      <AppContext.Provider 
        value={{
          setSongId,
          setArtistId,
          setAlbumId,
          setOpenBottomBar,
        }}
      >
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
                setArtistTerm={setArtistTerm}
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
                setSongTerm={setSongTerm}
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
                setAlbumTerm={setAlbumTerm}
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
      <BottomBar
          songId={songId}
          artistId={artistId}
          albumId={albumId}
          open={openBottomBar}
          setOpen={setOpenBottomBar}
        />
      </AppContext.Provider>
    </Router>
  );
}

export default App;
