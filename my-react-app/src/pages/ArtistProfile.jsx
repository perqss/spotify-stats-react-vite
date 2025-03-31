import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { lighterMainColor } from '../common';
import { getArtist } from '../clients/SpotifyClient';
//mport { TailSpin } from 'react-loader-spinner';
import { mainColor } from '../common';
import { useNavigate } from 'react-router-dom';
//import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const ArtistProfile = () => {
  const { artistId } = useParams();
  const [artistInfo, setArtistInfo] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getArtistWrapper = async () => {
        const response = await getArtist(artistId);
        setArtistInfo(response);
    };

    getArtistWrapper();
  }, [])
  
  return (
    <div style={{overflowX: 'hidden'}}>
        <IconButton
            sx={{
                top: '70px',
                left: '250px',
            }}
            onClick={() => navigate(-1)}
        >
            {/* <ArrowBackIosNewIcon
                sx={{
                    color: 'white'
                }}
            /> */}
        </IconButton>
        {artistInfo && 
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '200px',
                height: '100vh',
                backgroundColor: lighterMainColor,
            }}
        >
            <Avatar
                sx={{
                    width: '25vw',
                    height: '55vh',
                    marginTop: '60px',
                }}
                src={artistInfo.images[0].url}
            />

            <Paper
                sx={{
                    backgroundColor: mainColor,
                    padding: '10px',
                    margin: '10px'
                }}
            >
                <Typography
                    gutterBottom
                    variant='h6'
                    color='white'
                >
                    {artistInfo.followers.total} followers
                </Typography>
            </Paper>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                {artistInfo.genres.map((genre, index) =>
                    <Paper
                        key={index}
                        sx={{
                            margin: '10px',
                            backgroundColor: mainColor,
                            padding: '10px'
                        }}
                    >
                        <Typography
                            gutterBottom
                            variant='h6'
                            color='white'
                        >
                            {genre}
                        </Typography>
                    </Paper>
                )}
            </div>
            <SpotifyPlayButton
                href={artistInfo.external_urls.spotify}
                variant='contained'
                sx={{
                    margin: '10px'
                }}
                target='_BLANK'
            >
                <Typography
                    variant='h6'
                >
                    Play on Spotify
                </Typography>
            </SpotifyPlayButton>
        </div>}
    </div>
  )
};

export default ArtistProfile;