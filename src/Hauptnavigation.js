import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import './App.css';

function Hauptnavigation() {
    return (
        <Navbar className="navbar1 border-bottom">
            <Navbar.Brand><img src="images.svg" alt="" /> ImgConv</Navbar.Brand>
            <Nav.Link as={Link} to="/">Start</Nav.Link>
            <Nav.Link as={Link} to="/about">Über</Nav.Link>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text className="semver justify-content-right">v0.0.1</Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Hauptnavigation;