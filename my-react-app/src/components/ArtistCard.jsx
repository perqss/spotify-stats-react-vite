// import { useContext } from 'react';
// import { mainColor} from '../common';
// //import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
// import { AppContext } from '../App';
// import { useNavigate } from 'react-router-dom';

// const ArtistCard = (props) => {
//   const setArtistId = useContext(AppContext)?.setArtistId;
//   const setSongId = useContext(AppContext)?.setSongId;
//   const setAlbumId = useContext(AppContext)?.setAlbumId;
//   const setOpenBottomBar = useContext(AppContext)?.setOpenBottomBar;
//   const navigate = useNavigate();

//   const handleClickPlayBtn = () => {
//     setArtistId(props.artistInfo?.id);
//     setOpenBottomBar(true);
//     setSongId(null);
//     setAlbumId(null);
//   };

//   const handleClickAritst = () => {
//     navigate(`/artist/${props.artistInfo.id}`);
//   };

//   return (
//     <Card 
//       className={props.className}
//       sx={{backgroundColor: mainColor, margin: 1}}>
//       <CardActionArea
//         onClick={handleClickAritst}
//       >
//         <CardMedia
//           sx={{ height: '200px'}}
//           image={props.artistInfo.images[0].url}
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h7" color='white'>
//             {`${props.index}. ${props.artistInfo.name}`}
//           </Typography>
//         </CardContent>
//         <CardActions
//           disableSpacing
//         >
//         </CardActions>
//       </CardActionArea>
//       <IconButton
//         sx={{
//           color: 'white'
//         }}
//         onClick={handleClickPlayBtn}
//       >
//         <Icon>
//           play_circle
//         </Icon>
//       </IconButton>
//     </Card>
//   );
// }

// export default ArtistCard;