import { useState, createContext } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import BottomBar from './components/BottomBar';
import CustomRoutes from './components/CustomRoutes';
import PlaybackProvider from './components/PlaybackProvider';

// po kliknięciu 'play' następuje re-render App.jsx i konkretny komponent Route również się re renderuje a wraz nim potencjalnie cała lista artystów, piosenek itp.
// żeby temu zapobiec trzeba prawdopodobnie zmienić strukturę komponentów, tzn. useState() definiować w TopSongs, TopArtists itp. bo nie da się dać memo na Route  - można by o tym napisać w pracy

// export const AppContext = createContext();

function App() {
  // const [songId, setSongId] = useState();
  // const [artistId, setArtistId] = useState();
  // const [albumId, setAlbumId] = useState();
  // const [openBottomBar, setOpenBottomBar] = useState(false);
  console.log('app')

  return (
    <BrowserRouter>
      <PlaybackProvider>
        <CustomRoutes/>
        <BottomBar/>
      </PlaybackProvider>
    </BrowserRouter>
  );
}

export default App;
