import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { upload } from '../../../assets/images';
import ApiService from '../../../services/ApiService';

import './KYCDocuments.scss';

const staticContents = {
    uploadBtnText: 'Upload',
};

const MandatorySymbol = () => {
    return (<span className="text-danger">*</span>);
};



const KYCDocuments = () => {

    const [ panCard, setPanCard ] = React.useState('(Scanned copy of PAN Card)');  
    const [ aadhaarCard, setAadhaarCard ] = React.useState('(Front & back side of your Aadhaar)');  
    const [ qualificationCertificate, setQualificationCertificate ] = React.useState('(Final year Marksheet / Ceritificate)');
    const [ hscCertificate, setHSCCertificate ] = React.useState('(HSC Marksheet / Ceritificate)');
    const [ sscCertificate, setSSCCertificate ] = React.useState('(SSC Marksheet / Ceritificate)');
    const now = 100;

    const uploadFile = (docType) => {
   
        const input = document.createElement("input")
        input.setAttribute("type", "file")
        input.click()
        input.onchange = async () => {
          const file = input.files[0];
        //   console.log(file);
          uploadToS3(file, docType);
        //   setbanner_assets([
        //     ...banner_assets.slice(0, index),
        //     { url: file.name, file: file, type: file.type },
        //     ...banner_assets.slice(index + 1),
        //   ])
        }
    }
    
    const uploadToS3 = (inputFile, docType) => {
       
        if (inputFile) {
            // console.log(inputFile);
          let promise = new Promise((resolve, reject) => {
            let payload = {
              file_name: inputFile.name,
              type: inputFile.type,
              document_type: docType
            }
            console.log(payload);
            
           ApiService('/student/upload-document', `POST`, payload, true)
              .then(response => {
                if (response.data) {
                    // console.log(response.data.data.signedUrl);
                    // console.log(inputFile);
                  uploadUsingSignedUrl(response.data.data.signedUrl, inputFile, docType).then(res => {
                    console.log(res);
                    resolve(true)
                  })
                }
              })
              .catch(error => {
                console.log("Upload Error : ", error)
              })
          })
        }
    }
    const  uploadUsingSignedUrl = (url, data, docType) => {  
       
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "image/jpeg");
        var file = data;
        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: file,
          redirect: 'follow'
        };
        fetch(url, requestOptions)
          .then(response => {
            if ( docType == 'pan_card') {
                setPanCard(data.name)
            } else if ( docType == 'aadhar_card') {
                setAadhaarCard(data.name)
            } else if ( docType == 'qualification_certificate') {
                setQualificationCertificate(data.name)
            } else if ( docType == 'hsc_certificate') {
                setHSCCertificate(data.name)
            } else if ( docType == 'ssc_certificate') {
                setSSCCertificate(data.name)
            }
            response.text()
        })
        //   .then(result => console.log(result))
          .catch(error => console.log('error', error));
      }

    return (
        <>
            <div className='my-4'>
                <p className='note'>Note: Kindly refer <span className='text-secondary'>Max: 2 MB, Mini: 500 KB</span> file size and format must be JPEG, JPG, PNG, PDF, ZIP file while uploading the documents.</p>
                <Row className='my-2'>
                    <Col>
                        <div className="upload-container">
                            <input className="file-upload-input" type="file" onClick={() => uploadFile('pan_card')} accept="image/*" />
                            <div className="uploadbtn-text">
                                
                                <h3>PAN Card <MandatorySymbol /></h3>
                               
                                <p>{panCard}</p>
                               
                            </div>
                            <div className='upload-btn'>
                                <img src={upload}></img>
                                
                                <p>Upload</p>
                            </div>
                            
                        </div>
                        {/* <ProgressBar now={now} label={`${now}%`} /> */}
                    </Col>
                    <Col>
                        <div className="upload-container">
                            <input className="file-upload-input" type='file' onClick={() => uploadFile('aadhar_card')} accept="image/*" />
                            <div className="uploadbtn-text">
                                <h3>Aadhar Card <MandatorySymbol /></h3>
                                <p>{ aadhaarCard }</p>
                            </div>
                            <div className='upload-btn'>
                                <img src={upload}></img>
                                <p>Upload</p>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="upload-container">
                            <input className="file-upload-input" type='file'onClick={() => uploadFile('qualification_certificate')} accept="image/*" />
                            <div className="uploadbtn-text">
                                <h3>Latest Qualification Certificate <MandatorySymbol /></h3>
                                <p>{qualificationCertificate}</p>
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
                            <input className="file-upload-input" type='file'onClick={() => uploadFile('hsc_certificate')} accept="image/*" />
                            <div className="uploadbtn-text">
                                <h3>HSC Certificate <MandatorySymbol /></h3>
                                <p>{hscCertificate}</p>
                            </div>
                            <div className='upload-btn'>
                                <img src={upload}></img>
                                <p>Upload</p>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="upload-container">
                            <input className="file-upload-input" type='file'onClick={() => uploadFile('ssc_certificate')} accept="image/*" />
                            <div className="uploadbtn-text">
                                <h3>SSC Certificate <MandatorySymbol /></h3>
                                <p>{sscCertificate}</p>
                            </div>
                            <div className='upload-btn'>
                                <img src={upload}></img>
                                <p>Upload</p>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="upload-container tc">
                            <input className="file-upload-input" type='file'onClick={() => uploadFile('pap')} accept="image/*" />
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