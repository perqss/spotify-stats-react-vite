import React, { useState, useEffect } from 'react';
import TopBar from './TopBar';
import { useNavigate } from 'react-router-dom';
import styles from './Menu.module.css'

const Menu = ({componentIndex, setTerm}) => {
  const [selectedMenu, setSelectedMenu] = useState(componentIndex);
  const [selectedSubMenu, setSelectedSubMenu] = useState('All Time');
  const menuItems = ['Top Artists', 'Top Songs', 'Top Albums', 'Recently Played', 'Music Taste', 'Followed Artists'];
  const subMenuItems = ['All Time', 'Last 6 Months', 'Last 4 Weeks'];
  const menuIcons = ['mic', 'music_note', 'album', 'history', 'query_stats', 'favorite_border'];
  const navigate = useNavigate();

  const handleClickMenuItem = (index) => {
    setSelectedMenu(index);
  };

  const openSubMenu = (index) => {
    return [0, 1, 2].includes(index) && selectedMenu === index;
  };

  useEffect(() => {
     switch(selectedMenu) {
        case 0:
            navigate('/top-artists');
            break;
        case 1:
            navigate('/top-songs');
            break;
        case 2:
            navigate('/top-albums');
            break;
        case 3:
            navigate('/recently-played');
            break;
        case 4:
            navigate('/music-taste');
            break;
        case 5:
            navigate('/followed-artists');
            break;
        }
  }, [selectedMenu])

  const handleClickSubMenuItem = (subMenuItem) => {
    switch(subMenuItem) {
        case subMenuItems[0]:
            setTerm('long_term')
            setSelectedSubMenu(subMenuItems[0]);
            break;
        case subMenuItems[1]:
            setTerm('medium_term')
            setSelectedSubMenu(subMenuItems[1]);
            break;
        case subMenuItems[2]:
            setTerm('short_term')
            setSelectedSubMenu(subMenuItems[2]);
            break;
    }
};

//   const handleClickSubMenuItem = (subMenuItem, index) => {
//     if (index === 0) {
//         setPropsTerm(subMenuItem, props.setArtistTerm);
//     } else if (index === 1) {
//         setPropsTerm(subMenuItem, props.setSongTerm);
//     } else if (index === 2) {
//         setPropsTerm(subMenuItem, props.setAlbumTerm);
//     }
//     setSelectedSubMenu(subMenuItem);
//   };

  return (
    <div>
      <TopBar />
      <aside className={styles["sidebar"]}>
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <div
              className={`menu-${index} ${styles["menu-item"]} ${selectedMenu === index ? styles["selected-menu"] : ""}`}
              onClick={() => handleClickMenuItem(index)}
            >
              <span className={`material-icons ${styles["icon"]}`}>{menuIcons[index]}</span>
              <span className={styles["label"]}>{item}</span>
            </div>

            {openSubMenu(index) && (
              <div className={styles["submenu"]}>
                {subMenuItems.map((subItem, i) => (
                  <div
                    key={i}
                    className={`${styles["submenu-item"]} ${selectedSubMenu === subItem ? styles["selected-submenu"] : ""}`}
                    onClick={() => handleClickSubMenuItem(subItem)}
                  >
                    {subItem}
                  </div>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </aside>
    </div>
  )
}

export default Menu