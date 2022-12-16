import Spinner from 'react-bootstrap/Spinner';

function Loader() {
  return (
    // <div className="d-flex justify-content-center align-items-center" style={{ height: '650px' }}>
    //   <Spinner animation="border" variant="warning" />
    // </div>
    <div className="loader-wrapper">
      <div className="spinner"></div>
    </div>
  );
}

export default Loader;
