import React, { useState, useEffect } from 'react';
import '../App.css';
import logo from '../assets/react.svg';
import  { spotifyGreen, getLoginUrl, getLocalAccessToken, getCodeFromUrl, getTokens, checkIfTokenHasExpired } from '../common';
import { useNavigate } from 'react-router-dom';
import styles from '../components/Login.module.css'


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
    <div className={styles["App"]}>
      <header className={styles["App-header"]}>
        <img src={logo} className={styles["logo"]} alt="logo" />
        {loginUrl && 
            <a href={loginUrl}>
                Log in with Spotify
            </a>
        }
      </header>
    </div>
  );
}

export default Login;
