import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ReiheTopNavigation() {
    return (
        <Navbar>
            <Navbar.Brand><img src="images.svg" alt="" /> ImgConv</Navbar.Brand>
            <Nav.Link as={Link} to="/">Start</Nav.Link>
            <Nav.Link as={Link} to="/about">Über</Nav.Link>
        </Navbar>
    );
  }
  
  export default ReiheTopNavigation;