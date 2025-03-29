import React, { useState, useEffect } from 'react';
import '../App.css';
import { Button } from '@mui/material';
import logo from '../assets/react.svg';
import  { spotifyGreen, getLoginUrl, getLocalAccessToken, getCodeFromUrl, getTokens, checkIfTokenHasExpired } from '../common';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  const [loginUrl, setLoginUrl] = useState('');

  useEffect(() => {
    const code = getCodeFromUrl();
    const afterLogIn = async () => {
        await getTokens(code);
        navigate('/top-artists');
    };

    const logIn = async () => {
      const url = await getLoginUrl();
      setLoginUrl(url);
    };

    code ? afterLogIn() : logIn();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="logo" alt="logo" />
        {loginUrl && 
            <Button
                href={loginUrl}
                variant='contained'
                className="login-button"
                sx={{
                backgroundColor: spotifyGreen,
                color: 'black',
                '&:hover': {
                    backgroundColor: '#68bd72'
                }
                }}
            >
                Log in with Spotify
            </Button>
        }
      </header>
    </div>
  );
}

export default Login;
