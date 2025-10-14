import AuthForm from './components/AuthForm';
import {
  Anchor,
  Box,
  Button,
  Grommet,
  Header,
  Paragraph,
  Tab,
  Tabs,
} from 'grommet';
import { theme } from './theme';
import { useAuth } from './hooks/useAuth';
import MusicList from './components/MusicList';
import { useState } from 'react';
import AudioPlayer from './components/AudioPlayer';
import { Bookmark, Search } from 'grommet-icons';
import { PlayerProvider } from './contexts/PlayerContext';

function App() {
  const [tabIndex, setTabindex] = useState(0);
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
        <Box fill flex>
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
                      fontStyle: 'italic',
                      fontWeight: 'bold',
                    }}
                  />{' '}
                  __ Discover Releases
                </Paragraph>
                {token ? (
                  <Button label="Logout" size="small" onClick={handleLogout} />
                ) : null}
              </Header>
              <AudioPlayer />
              <Box flex>
                <Tabs
                  flex
                  onActive={(index) => setTabindex(index)}
                  alignControls="flex-start"
                  activeIndex={tabIndex}
                  style={{ flexDirection: 'column-reverse' }}
                >
                  <Tab title="Discover" icon={<Search size="20" />}>
                    <Box
                      fill
                      overflow="auto"
                      pad={{ vertical: 'small', horizontal: 'large' }}
                      align="center"
                      tabIndex={0}
                    >
                      <MusicList />
                    </Box>
                  </Tab>
                  <Tab title="Favourites" icon={<Bookmark size="20" />}></Tab>
                </Tabs>
              </Box>
            </>
          )}
          <Paragraph
            textAlign="center"
            size="small"
            margin="xsmall"
            alignSelf="end"
            style={{ position: 'absolute', bottom: '0', right: '0' }}
          >
            Powered by{' '}
            <Anchor
              label="nina"
              href="https://www.ninaprotocol.com/"
              target="_blank"
              rel="noopener noreferrer"
            />
          </Paragraph>
        </Box>
      </Grommet>
    </PlayerProvider>
  );
}

export default App;
