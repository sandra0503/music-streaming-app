import { useState } from 'react';
import AuthForm from './components/AuthForm';
import { fetchProtected } from "./api";

function App() {
  const [token, setToken] = useState(null);


  return (
    <div>
      <button onClick={fetchProtected}>Fetch Protected Data</button>
      {!token ? (
        <AuthForm />

      ) : (
        <>
          <h2>Logged in!</h2>
          <button onClick={fetchProtected}>Fetch Protected Data</button>
        </>
      )}
    </div>
  );
}

export default App;
