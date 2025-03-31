import React, { useEffect, useState } from 'react';
import { lighterMainColor } from '../common';
import { parseArtists } from '../common';
import { grey, getReleaseDateYear } from '../common';
import { getTrackAudioFeatures, getTrackAudioAnalysis, getTrack } from '../clients/SpotifyClient';
import { useNavigate, useParams } from 'react-router-dom';


const SongInfo = () => {
  const { songId } = useParams();
  const [songInfo, setSongInfo] = useState();
  const [audioFeatures, setAudioFeatures] = useState();
  const [audioAnalysis, setAudioAnalysis] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getTrackAudioFeaturesWrapper = async () => {
      const response = await getTrackAudioFeatures(songId);
      setAudioFeatures(response);
    };

    getTrackAudioFeaturesWrapper();
  }, [])

  useEffect(() => {
    const getTrackAudioAnalysisWrapper = async () => {
      const response = await getTrackAudioAnalysis(songId);
      setAudioAnalysis(response);
    };

    getTrackAudioAnalysisWrapper();
  }, [])

  useEffect(() => {
    const getTrackWrapper = async () => {
      const response = await getTrack(songId);
      setSongInfo(response);
    }

    getTrackWrapper();
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
            <ArrowBackIosNewIcon
                sx={{
                    color: 'white'
                }}
            />
        </IconButton>
      {songInfo &&
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '200px',
                height: '100%',
                backgroundColor: lighterMainColor,
            }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row'
            }}
          > 
            <Avatar
                sx={{
                    width: '25vw',
                    height: '55vh',
                    marginTop: '80px',
                    marginLeft: '120px',
                    borderRadius: 0,
                }}
                src={songInfo.album.images[0].url}
            />
            <div
              style={{
                marginLeft: '2vw'
              }}
            >
                <Typography
                    variant='h4'
                    color='white'
                    sx={{
                      marginTop: '80px',
                    }}
                >
                    {songInfo.name}
                </Typography>
                <Typography
                    variant='h5'
                    color={grey}
                >
                    {songInfo.album.name}
                </Typography>
                <Typography
                    variant='h6'
                    color={grey}
                >
                    {parseArtists(songInfo.artists)}
                </Typography>
                <Typography
                    variant='h6'
                    color={grey}
                >
                    {getReleaseDateYear(songInfo.album.release_date)}
                </Typography>
                <SpotifyPlayButton
                    href={songInfo.external_urls.spotify}
                    variant='contained'
                    target='_BLANK'
                    sx={{
                      marginTop: '10px'
                    }}
                >
                <Typography
                    variant='h6'
                >
                    Play on Spotify
                </Typography>
                </SpotifyPlayButton>
              </div>
          </div>
        </div>}
    </div>
  )
};

export default SongInfo;