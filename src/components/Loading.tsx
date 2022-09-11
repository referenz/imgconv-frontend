import { Spinner } from 'react-bootstrap';

function ReiheLoading() {
  return (
    <Spinner animation='border' role='status'>
      <span className='visually-hidden'>Lädt ...</span>
    </Spinner>
  );
}

export default ReiheLoading;
