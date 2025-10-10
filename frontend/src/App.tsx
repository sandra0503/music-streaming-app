import AuthForm from './components/AuthForm';
import { Button, Grommet, Header } from 'grommet';
import { theme } from './theme';
import { useAuth } from './hooks/useAuth';
import MusicList from './components/MusicList';

function App() {
  const { token, setToken } = useAuth();

  const handleLogin = (t: string) => {
    setToken(t);
  };

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <Grommet theme={theme} full>
      <Header
        background="light-3"
        pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      />
      {!token ? (
        <AuthForm onLogin={handleLogin} />
      ) : (
        <>
          <MusicList />
          <Button label="Logout" onClick={handleLogout} />
        </>
      )}
    </Grommet>
  );
}

export default App;
