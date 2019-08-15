import React from 'react';
import MainMenu from '../../layout/MainMenu/MainMenu';
import Logo from '../../common/Logo/Logo';
import styles from './NavBar.scss';

class NavBar extends React.Component {
  state = {
    links: [
      { path: '/', title: 'Home' },
      { path: '/posts/new', title: 'Add post' },
      { path: '/posts', title: 'Posts' },
      { path: '/contact', title: 'Contact' },
      { path: '/random', title: 'Random post'}
    ],
  }

  render() {
    const { links } = this.state;
  
    return (
      <nav className="navbar" style={styles}>
        <Logo />
        <MainMenu links={links} />
      </nav>
    );
  }

}

export default NavBar;