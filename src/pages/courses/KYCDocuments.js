import { Col, Row } from 'react-bootstrap';
import { upload } from '../../assets/images';

import './KYCDocuments.scss';

const staticContents = {
    uploadBtnText: 'Upload',
};

const MandatorySymbol = () => {
    return (<span className="text-danger">*</span>);
};

const KYCDocuments = () => {
    return (
        <>
            <div className='my-4'>
                <p className='note'>Note: Kindly refer <span className='text-secondary'>Max: 2 MB, Mini: 500 KB</span> file size and format must be JPEG, JPG, PNG, PDF, ZIP file while uploading the documents.</p>
                <Row className='my-2'>
                    <Col>
                        <div className="upload-container">
                            <input className="file-upload-input" type='file' hidden onChange="" accept="image/*" />
                            <div className="uploadbtn-text">
                                <h3>PAN Card <MandatorySymbol /></h3>
                                <p>(Scanned copy of PAN Card)</p>
                            </div>
                            <div className='upload-btn'>
                                <img src={upload}></img>
                                <p>Upload</p>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="upload-container">
                            <input className="file-upload-input" type='file' hidden onChange="" accept="image/*" />
                            <div className="uploadbtn-text">
                                <h3>Aadhar Card <MandatorySymbol /></h3>
                                <p>(Front & back side of your Aadhaar)</p>
                            </div>
                            <div className='upload-btn'>
                                <img src={upload}></img>
                                <p>Upload</p>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="upload-container">
                            <input className="file-upload-input" type='file' hidden onChange="" accept="image/*" />
                            <div className="uploadbtn-text">
                                <h3>Latest Qualification Certificate <MandatorySymbol /></h3>
                                <p>(Final year Marksheet / Ceritificate)</p>
                            </div>
                            <div className='upload-btn'>
                                <img src={upload}></img>
                                <p>Upload</p>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row className='my-4'>
                    <Col>
                        <div className="upload-container">
                            <input className="file-upload-input" type='file' hidden onChange="" accept="image/*" />
                            <div className="uploadbtn-text">
                                <h3>HSC Certificate <MandatorySymbol /></h3>
                                <p>(Final year Marksheet / Ceritificate)</p>
                            </div>
                            <div className='upload-btn'>
                                <img src={upload}></img>
                                <p>Upload</p>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="upload-container">
                            <input className="file-upload-input" type='file' hidden onChange="" accept="image/*" />
                            <div className="uploadbtn-text">
                                <h3>SSC Certificate <MandatorySymbol /></h3>
                                <p>(Final year Marksheet / Ceritificate)</p>
                            </div>
                            <div className='upload-btn'>
                                <img src={upload}></img>
                                <p>Upload</p>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="upload-container tc">
                            <input className="file-upload-input" type='file' hidden onChange="" accept="image/*" />
                            <div className="uploadbtn-text">
                                <h3>PAP Terms & Conditions <MandatorySymbol /></h3>
                                <p>(Read & Sign the payment and placement T&C)</p>
                            </div>
                            <div className='upload-btn sign-btn'>
                                <img src={upload}></img>
                                <p className='sign'>Sign</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default KYCDocuments;