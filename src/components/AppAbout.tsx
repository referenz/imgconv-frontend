import { Container, Button } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';

function AppAbout() {
  const [connected, setConnected] = useState<boolean>(false);
  useEffect(() => {
    console.log(process.env.REACT_APP_BACKEND);
    const fetchURL =
      process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://referenz.io/ImgConv/backend';
    fetch(fetchURL).then(
      res => {
        if (res.ok && res.status === 200) setConnected(true);
      },
      err => console.log(err)
    );
  }, []);

  return (
    <Container fluid as={'main'}>
      <h1>ImgConv: Bilder online konvertieren</h1>
      <p>
        Verbindung zum Backend:{' '}
        {connected === false ? (
          <Button variant='warning'>nicht hergestellt</Button>
        ) : (
          <Button variant='success'>hergestellt</Button>
        )}
      </p>
      <hr />
      <p>
        Frontend-Code:{' '}
        <a href='https://github.com/referenz/imgconv-frontend'>https://github.com/referenz/imgconv-frontend</a>
      </p>
      <p>
        Backend-Code:{' '}
        <a href='https://github.com/referenz/imgconv-backend'>https://github.com/referenz/imgconv-backend</a>
      </p>
    </Container>
  );
}

export default AppAbout;
