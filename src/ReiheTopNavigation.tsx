import { Navbar, Nav } from 'react-bootstrap';

function ReiheTopNavigation() {
    return (
        <Navbar>
            <Navbar.Brand><img src="images.svg" alt="" /> ImgConv</Navbar.Brand>
            <Nav.Link href="/">Start</Nav.Link>
            <Nav.Link href="/about">Über</Nav.Link>
        </Navbar>
    );
  }
  
  export default ReiheTopNavigation;