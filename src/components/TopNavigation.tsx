import { Image, Nav, Navbar } from 'react-bootstrap';
import './TopNavigation.css';
import Images from './images.svg';
import { Link } from 'react-router-dom';

function TopNavigation() {
  return (
    <Navbar as='header'>
      <Navbar.Brand>
        <Image src={Images} alt='' /> ImgConv{' '}
      </Navbar.Brand>
      <Nav.Link as={Link} to='/'>
        Start
      </Nav.Link>
      <Nav.Link as={Link} to='/about'>
        Über
      </Nav.Link>
    </Navbar>
  );
}

export default TopNavigation;
