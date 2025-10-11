import AuthForm from './components/AuthForm';
import { Box, Button, Grommet, Header, Heading, Tab, Tabs } from 'grommet';
import { theme } from './theme';
import { useAuth } from './hooks/useAuth';
import MusicList from './components/MusicList';
import { useState } from 'react';

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
    <Grommet theme={theme} full>
      <Box fill flex>
        <Header
          background="light-3"
          justify="between"
          pad={{ left: 'medium', right: 'small', vertical: 'small' }}
        >
          <Heading level={2} margin="small">
            {tabIndex === 0 ? 'Discover releases' : 'Your Library'}
          </Heading>
          {token ? <Button label="Logout" onClick={handleLogout} /> : null}
        </Header>
        {!token ? (
          <AuthForm onLogin={handleLogin} />
        ) : (
          <Box flex>
            <Tabs
              flex
              style={{ flexDirection: 'column-reverse' }}
              onActive={(index) => setTabindex(index)}
            >
              <Tab title="Discover">
                <Box
                  fill
                  overflow="auto"
                  pad="xlarge"
                  align="center"
                  tabIndex={0}
                >
                  <MusicList />
                </Box>
              </Tab>
              <Tab title="Favourites"></Tab>
            </Tabs>
          </Box>
        )}
      </Box>
    </Grommet>
  );
}

export default App;
