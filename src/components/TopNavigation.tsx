import { Image, Nav, Navbar } from 'react-bootstrap';
import './TopNavigation.css';
import Images from './images.svg';

function TopNavigation() {
  return (
    <Navbar as='header'>
      <Navbar.Brand>
        <Image src={Images} alt='' /> ImgConv{' '}
      </Navbar.Brand>
      <Nav.Link href='/'>Start</Nav.Link>
      <Nav.Link href='/about'>Über</Nav.Link>
    </Navbar>
  );
}

export default TopNavigation;
