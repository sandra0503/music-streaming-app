import AuthForm from './components/AuthForm';
import { Anchor, Box, Footer, Grommet, Paragraph } from 'grommet';
import { theme } from './theme';
import { useAuth } from './hooks/useAuth';
import MusicList from './components/MusicList';
import AudioPlayer from './components/AudioPlayer';
import { PlayerProvider } from './contexts/PlayerContext';
import AppHeader from './components/AppHeader';

function App() {
  const { token, setToken } = useAuth();

  const handleLogin = (t: string) => {
    setToken(t);
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
                <MusicList token={token} />
                <AudioPlayer />
              </Box>
            </>
          )}
          <Footer justify="end">
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
