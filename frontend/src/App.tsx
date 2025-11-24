import AuthForm from './components/AuthForm';
import { Anchor, Box, Footer, Grommet, Paragraph } from 'grommet';
import { theme } from './theme';
import { useAuth } from './hooks/useAuth';
import MusicList from './components/MusicList';
import AudioPlayer from './components/AudioPlayer';
import { PlayerProvider } from './contexts/PlayerContext';
import AppHeader from './components/AppHeader';
import { Route, Routes } from 'react-router';
import FavouritesList from './components/FavouritesList';
import { useState } from 'react';

function App() {
  const { token, setToken } = useAuth();
  const [favouriteKeys, setFavouriteKeys] = useState<string[]>([]);

  const handleLogin = (t: string, favourites: string[]) => {
    setToken(t);
    setFavouriteKeys(favourites);
  };

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <PlayerProvider>
      <Grommet theme={theme} style={{ height: '100%' }}>
        <Box fill flex style={{ position: 'relative' }}>
          {!token ? (
            <AuthForm onLogin={handleLogin} />
          ) : (
            <>
              <AppHeader
                onLogout={handleLogout}
                style={{ height: 'headerHeight' }}
              />
              <Box tag="main" fill>
                <Routes>
                  <Route index element={<MusicList token={token} />} />
                  <Route
                    path="favourites"
                    element={<FavouritesList token={token} />}
                  />
                </Routes>
                <AudioPlayer favourites={favouriteKeys} />
              </Box>
            </>
          )}
          <Footer justify="end" style={{ marginTop: '-1rem' }}>
            <Paragraph size="small" margin="xsmall">
              Powered by{' '}
              <Anchor
                label="nina"
                href="https://www.ninaprotocol.com/"
                target="_blank"
                rel="noopener noreferrer"
              />
            </Paragraph>
          </Footer>
        </Box>
      </Grommet>
    </PlayerProvider>
  );
}

export default App;
