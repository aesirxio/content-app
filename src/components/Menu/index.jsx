import React, { useEffect, useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import './index.scss';
import { Collapse, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { observer } from 'mobx-react';
import ComponentImage from 'components/ComponentImage';
// const dataMenuSetup = [
//   {
//     text: 'txt_menu_field',
//     link: '/fields',
//     icons: '/assets/images/field.png',
//     icons_color: '/assets/images/field.png',
//   },
//   {
//     text: 'txt_menu_field_gr',
//     link: '/fields-group',
//     icons: '/assets/images/field_gr.png',
//     icons_color: '/assets/images/field_gr.png',
//   },
//   {
//     text: 'txt_menu_content',
//     link: '/content',
//     icons: '/assets/images/content.png',
//     icons_color: '/assets/images/content.png',
//   },
//   {
//     text: 'txt_menu_setting',
//     link: '/setting',
//     icons: '/assets/images/setting.svg',
//     icons_color: '/assets/images/setting.svg',
//     submenu: [
//       {
//         text: 'txt_menu_setting',
//         link: `/setting`,
//       },
//     ],
//   },
// ];
const Menu = observer((props) => {
  const [isOpenCollapse, setIsOpenCollapse] = useState('default');
  const handleOpen = (clickedIndex, parentIndex) => {
    if (isOpenCollapse === clickedIndex.toString()) {
      if (parentIndex) {
        setIsOpenCollapse(parentIndex.toString());
      } else {
        setIsOpenCollapse(null);
      }
    } else {
      if (isOpenCollapse?.includes(clickedIndex.toString())) {
        setIsOpenCollapse(null);
      } else {
        setIsOpenCollapse(clickedIndex.toString());
      }
    }
  };
  const checkActiveMenu = () => {
    if (window.location.pathname === '/') {
      document.getElementById('wr_list_menu').classList.remove('wr_list_menu');
    } else {
      document.getElementById('wr_list_menu').classList.add('wr_list_menu');
    }
  };

  const handleCheckActive = () => {
    checkActiveMenu();
  };

  const dataMenu = [
    {
      text: 'txt_menu_items',
      // link: `/data-${dataStreamActive}`,
      link: `/`,
      icons: '/assets/images/dashboard.svg',
      icons_color: '/assets/images/items.png',
      width: 24,
      height: 24,
    },
    {
      text: 'txt_menu_cate',
      link: `/categories`,
      icons: '/assets/images/cate_icon.png',
      icons_color: '/assets/images/cate_icon.png',
      width: 24,
      height: 24,
    },
    {
      text: 'txt_menu_dam',
      link: `/dam`,
      icons: '/assets/images/image.png',
      icons_color: '/assets/images/image.png',
      width: 24,
      height: 24,
    },
    {
      text: 'txt_migrator',
      link: `/migrator`,
      icons: '/assets/images/image.png',
      icons_color: '/assets/images/image.png',
      width: 24,
      height: 24,
      submenu: [
        {
          text: 'Joomla',
          link: '/migrator/joomla',
        },
        {
          text: 'Wordpress',
          link: '/migrator/wordpress',
        },
      ],
    },
  ];

  useEffect(() => {
    checkActiveMenu();
  }, []);

  const { t } = props;
  return (
    <>
      <nav className="main-menu py-24 mt-0">
        <p className="menu_title text-dark-blue fs-14 mb-0 text-uppercase">{t('txt_content')}</p>
        <ul id="wr_list_menu" className="list-unstyled mb-0 pt-md-1">
          {dataMenu.map((menuList, menuListkey) => {
            return (
              <li
                key={menuListkey}
                className={`item_menu ${menuList.className ? menuList.className : ''}`}
              >
                {!menuList.submenu ? (
                  <>
                    {menuList.link && (
                      <NavLink
                        exact={true}
                        to={menuList.link}
                        className={`d-block px-24 py-16 link_menu text-white text-decoration-none`}
                        activeClassName={`active`}
                      >
                        <ComponentImage
                          src={menuList.icons_color}
                          alt={t(menuList.text)}
                          width={menuList?.width}
                          height={menuList?.height}
                        />
                        <span className="ms-16 text d-inline-block fw-normal">
                          {t(menuList.text)}
                        </span>
                      </NavLink>
                    )}
                  </>
                ) : (
                  <>
                    <Button
                      variant=""
                      onClick={() => handleOpen(menuListkey)}
                      className={`d-flex align-items-center justify-content-start rounded-2 link_menu text-decoration-none text-break w-100 px-24 py-16 shadow-none ${
                        isOpenCollapse === menuListkey.toString() ||
                        isOpenCollapse?.includes(menuListkey + '-')
                          ? 'active'
                          : ''
                      }`}
                      aria-controls="wr_list_submenu"
                      aria-expanded={
                        isOpenCollapse === menuListkey.toString() ||
                        isOpenCollapse?.includes(menuListkey + '-')
                      }
                    >
                      <ComponentImage src={menuList.icons_color} alt={t(menuList.text)} />
                      <span className="ms-16 text d-inline-block fw-semibold">
                        {t(menuList.text)}
                      </span>

                      <ComponentImage
                        wrapperClassName="icon arrow d-inline-block align-text-bottom ms-auto"
                        src={'/assets/images/arrow-right.svg'}
                        alt={t(menuList.text)}
                      />
                    </Button>
                    <Collapse
                      in={
                        isOpenCollapse === menuListkey.toString() ||
                        isOpenCollapse?.includes(menuListkey + '-')
                      }
                    >
                      <ul id="wr_list_submenu" className="list-unstyled">
                        {menuList.submenu.map((value, menuListSubkey) => {
                          return (
                            <li
                              key={menuListSubkey}
                              className={`item_menu`}
                              onClick={handleCheckActive}
                            >
                              {value.link && (
                                <NavLink
                                  exact={true}
                                  to={value.link}
                                  className={`d-block px-24 py-16 link_menu text-white text-decoration-none`}
                                  activeClassName={`active`}
                                >
                                  <i className="icon-submenu text-white">
                                    <FontAwesomeIcon icon={faCircle} />
                                  </i>
                                  <span className="text d-inline-block">{t(value.text)}</span>
                                </NavLink>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </Collapse>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      {/* <nav className="border-top border-dark-blue py-2 mt-0 mb-auto">
        <p className="menu_title text-dark-blue fs-14 mb-0 text-uppercase">{t('txt_set_up')}</p>
        <ul id="wr_list_menu" className="list-unstyled mb-0 pt-md-1">
          {dataMenuSetup?.map((value, key) => {
            return (
              <li key={key} className={`item_menu ${value.className ? value.className : ''}`}>
                {!value?.submenu ? (
                  <NavLink
                    exact={true}
                    to={value.link}
                    className={`d-block px-24 py-16 link_menu text-white text-decoration-none `}
                    activeClassName={`active`}
                  >
                    <ComponentImage src={value.icons_color} alt={t(value.text)} />
                    <span className="ms-16 fw-semibold text d-inline-block">{t(value.text)}</span>
                  </NavLink>
                ) : (
                  <>
                    <Button
                      variant=""
                      onClick={() => handleOpen(key)}
                      className={`d-flex align-items-center justify-content-start rounded-2 link_menu text-decoration-none text-break w-100 px-24 py-16 shadow-none ${
                        isOpenCollapse === key.toString() || isOpenCollapse?.includes(key + '-')
                          ? 'active'
                          : ''
                      }`}
                      aria-controls="wr_list_submenu"
                      aria-expanded={
                        isOpenCollapse === key.toString() || isOpenCollapse?.includes(key + '-')
                      }
                    >
                      <ComponentImage src={value.icons_color} alt={t(value.text)} />
                      <span className="ms-16 text fw-semibold d-inline-block">{t(value.text)}</span>

                      <ComponentImage
                        wrapperClassName="icon align-text-bottom ms-auto"
                        src={'/assets/images/arrow-right.svg'}
                        alt={t(value.text)}
                      />
                    </Button>
                    <Collapse
                      in={isOpenCollapse === key.toString() || isOpenCollapse?.includes(key + '-')}
                    >
                      <ul id="wr_list_submenu" className="list-unstyled">
                        {value.submenu.map((value, menuListSubkey) => {
                          return (
                            <li
                              key={menuListSubkey}
                              className={`item_menu`}
                              onClick={handleCheckActive}
                            >
                              {value.link && (
                                <NavLink
                                  exact={true}
                                  to={value.link}
                                  className={`d-block px-24 py-16 link_menu text-white text-decoration-none`}
                                  activeClassName={`active`}
                                >
                                  <i className="icon-submenu text-white">
                                    <FontAwesomeIcon icon={faCircle} />
                                  </i>
                                  <span className="text d-inline-block">{t(value.text)}</span>
                                </NavLink>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </Collapse>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </nav> */}
    </>
  );
});

export default withTranslation('common')(withRouter(Menu));
