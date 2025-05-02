const BottomBar = ({ songId, artistId, albumId, open, setOpen }) => {
  const chooseSrc = () => {
    console.log('choosesrc')
    if (songId) {
        return `https://open.spotify.com/embed/track/${songId}?utm_source=generator`;
    } else if (artistId) {
        return `https://open.spotify.com/embed/artist/${artistId}?utm_source=generator`;
    } else if (albumId) {
        return `https://open.spotify.com/embed/album/${albumId}?utm_source=generator`;
    }
    return '';
  };

  return (
    <div>
        {open && <div style={{marginTop: '100px'}}>
            <iframe
                style={{
                    position: 'fixed',
                    width: '100%',
                    borderRadius: '12px',
                    bottom: '-70px',
                }}
                src={chooseSrc()}
                frameBorder="0" 
                allowFullScreen="" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                title="Spotify Player"
            ></iframe>
            <button 
                style={{
                    bottom: '70px',
                    left: '0px',
                    padding: '10px',
                    position: 'fixed',
                    border: 'none',
                    backgroundColor: 'inherit',
                }}
                onClick={() => setOpen(false)}
                className="material-icons"
            >
                cancel
            </button>
        </div>}
    </div>
  )
}

export default BottomBar;