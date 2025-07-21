import { useState, useEffect, Fragment } from 'react';
import TopBar from './TopBar';
import { useNavigate } from 'react-router-dom';
import styles from './Menu.module.css';

const Menu = ({ componentIndex, setTerm, closeSubMenu }) => {
  const [selectedMenu, setSelectedMenu] = useState(componentIndex);
  const [selectedSubMenu, setSelectedSubMenu] = useState('All Time');
  const menuItems = ['Top Artists', 'Top Songs', 'Top Albums', 'Recently Played', 'Music Taste', 'Followed Artists', 'Saved Songs'];
  const subMenuItems = ['All Time', 'Last 6 Months', 'Last 4 Weeks'];
  const menuIcons = ['mic', 'music_note', 'album', 'history', 'query_stats', 'favorite_border', 'bookmarks'];
  const navigate = useNavigate();

  const handleClickMenuItem = (index) => {
    setSelectedMenu(index);
  };

  const openSubMenu = (index) => {
    return [0, 1, 2].includes(index) && selectedMenu === index && !closeSubMenu;
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
        case 6:
            navigate('/saved-songs');
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

  return (
    <div>
      <TopBar />
      <aside className={styles["sidebar"]}>
        {menuItems.map((item, index) => (
          <Fragment key={index}>
            <div
              className={`${styles["menu-item"]} ${selectedMenu === index ? styles["selected-menu"] : ""}`}
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
          </Fragment>
        ))}
      </aside>
    </div>
  );
};

export default Menu