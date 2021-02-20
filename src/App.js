//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import Hauptnavigation from './Hauptnavigation';
import Inputreihe from './Inputreihe';
import Tabreihe from './Tabreihe';
import { useState } from 'react';

function App() {
  const [imageloaded, setImageloaded] = useState(false); // default in production: false
  const toggleImageloaded = () => setImageloaded(!imageloaded);

  const [originalImage, setOriginalImage] = useState('');

  return (
    <Container fluid className="vh-100 d-flex flex-column">
      <Row><Col className="px-0"><Hauptnavigation className="navbar1" /></Col></Row>
      <Row><Col classNAme="px-0"><Inputreihe className="inputbar1" toggle={toggleImageloaded} reset={setImageloaded} setimage={setOriginalImage} /></Col></Row>
      <Row className="flex-fill"><Col className="my-auto px-0"><Tabreihe isLoaded={imageloaded} image={originalImage} /></Col></Row>
    </Container>
  );
}

export default App;
