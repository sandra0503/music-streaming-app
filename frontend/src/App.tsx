import AuthForm from './components/AuthForm';
import { Anchor, Box, Footer, Grommet, Header, Menu, Paragraph } from 'grommet';
import { theme } from './theme';
import { useAuth } from './hooks/useAuth';
import MusicList from './components/MusicList';
import AudioPlayer from './components/AudioPlayer';
import { PlayerProvider } from './contexts/PlayerContext';

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
      <Grommet theme={theme} full>
        <Box fill flex style={{ position: 'relative' }}>
          {!token ? (
            <AuthForm onLogin={handleLogin} />
          ) : (
            <>
              <Header
                background="light-3"
                justify="between"
                pad={{ left: 'medium', right: 'small', vertical: 'small' }}
              >
                <Paragraph margin="xsmall" size="small">
                  <Anchor
                    label="Luma"
                    href="/"
                    size="large"
                    style={{
                      textDecoration: 'none',
                      fontWeight: 'bold',
                    }}
                  />{' '}
                  __ Discover Releases
                </Paragraph>
                <Menu
                  aira-label="Menu"
                  items={[
                    {
                      label: 'Logout',
                      onClick: () => {
                        handleLogout();
                      },
                    },
                  ]}
                />
              </Header>
              <Box tag="main" fill>
                <MusicList />
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
