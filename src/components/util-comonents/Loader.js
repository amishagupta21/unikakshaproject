import Spinner from 'react-bootstrap/Spinner';

function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '650px' }}>
      <Spinner animation="border" variant="warning" />
    </div>
  );
}

export default Loader;
