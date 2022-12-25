import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useDispatch } from 'react-redux';
import { circleTick, Icon, signDoc, trash, upload, view } from '../../../assets/images';
import ApiService from '../../../services/ApiService';
import { openToaster } from '../../../redux/actions/ToastAction';
import './KYCDocuments.scss';

const staticContents = {
  uploadBtnText: 'Upload',
  aadhaarPlaceholder: '(Front & back side of your Aadhaar)',
  panCardPlaceholder: '(Scanned copy of PAN Card)',
  qcPlaceholder: '(Final year Marksheet / Ceritificate)',
  hscPlaceholder: '(HSC Marksheet / Ceritificate)',
  sscPlaceholder: '(SSC Marksheet / Ceritificate)',
};

const CirleTick = () => {
  return <img src={circleTick} style={{ margin: 'auto 10px auto 0px', height: '25px' }}></img>;
};

const MandatorySymbol = () => {
  return <span className="text-danger">*</span>;
};

const ActionButtons = ({ property, fileKey, uploadFile, viewDocument, deleteDocument }) => {
  return (
    <>
      {property.percentage == 0 && (
        <>
          <p onClick={() => uploadFile(fileKey)}>
            {' '}
            <img src={upload}></img>Upload
          </p>
        </>
      )}
      {property.percentage == 100 && (
        <>
          <img onClick={() => viewDocument(fileKey)} height="12rem" src={view}></img>
          <img onClick={() => deleteDocument(fileKey)} height="20rem" src={trash}></img>
        </>
      )}
    </>
  );
};

const FieldLabel = ({ label, property }) => {
  return (
    <>
      <div className="uploadbtn-text">
        {property.percentage == 100 && <CirleTick />}
        <div>
          <h3>
            {label} <MandatorySymbol />
          </h3>
          {property.percentage == 0 || property.percentage == 100 ? (
            <p>{property.placeholder}</p>
          ) : (
            <ProgressBar
              variant="secondary"
              now={property.percentage}
              label={`${property.percentage}%`}
              style={{ width: '320px' }}
            />
          )}
        </div>
      </div>
    </>
  );
};

const KYCDocuments = () => {
  const [panCard, setPanCard] = React.useState({
    placeholder: staticContents.panCardPlaceholder,
    percentage: 0,
  });
  const [aadhaarCard, setAadhaarCard] = React.useState({
    placeholder: staticContents.aadhaarPlaceholder,
    percentage: 0,
  });
  const [qualificationCertificate, setQualificationCertificate] = React.useState({
    placeholder: staticContents.qcPlaceholder,
    percentage: 0,
  });
  const [hscCertificate, setHSCCertificate] = React.useState({
    placeholder: staticContents.hscPlaceholder,
    percentage: 0,
  });
  const [sscCertificate, setSSCCertificate] = React.useState({
    placeholder: staticContents.sscPlaceholder,
    percentage: 0,
  });

  const dispatch = useDispatch();

  const uploadFile = (docType) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();
    input.onchange = async () => {
      const file = input.files[0];
      if (file.size / 1e6 > 2) {
        dispatch(
          openToaster({
            show: true,
            header: 'Warning!',
            variant: 'warning',
            body: 'File size exceeds the max. allowed size : 2 Mb',
          })
        );
        return;
      }
      uploadToS3(file, docType);
    };
  };

  const viewDocument = (fileKey) => {};

  const deleteDocument = (docType) => {
    switch (docType) {
      case 'pan_card':
        setPanCard({
          placeholder: staticContents.panCardPlaceholder,
          percentage: 0
        });
        break;

      case 'aadhar_card':
        setAadhaarCard({
          placeholder: staticContents.aadhaarPlaceholder,
          percentage: 0
        });
        break;

      case 'qualification_certificate':
        setQualificationCertificate({
          placeholder: staticContents.qcPlaceholder,
          percentage: 0
        });
        break;

      case 'hsc_certificate':
        setHSCCertificate({
          placeholder: staticContents.hscPlaceholder,
          percentage: 0
        });
        break;

      case 'ssc_certificate':
        setSSCCertificate({
          placeholder: staticContents.sscPlaceholder,
          percentage: 0
        });
        break;

      default:
        break;
    }
  };

  const setLoader = (docType, loaded, total) => {
    const percentage = ((loaded / total) * 100).toFixed();
    switch (docType) {
      case 'pan_card':
        setPanCard((old) => ({ ...old, percentage: percentage }));
        break;

      case 'aadhar_card':
        setAadhaarCard((old) => ({ ...old, percentage: percentage }));
        break;

      case 'qualification_certificate':
        setQualificationCertificate((old) => ({ ...old, percentage: percentage }));
        break;

      case 'hsc_certificate':
        setHSCCertificate((old) => ({ ...old, percentage: percentage }));
        break;

      case 'ssc_certificate':
        setSSCCertificate((old) => ({ ...old, percentage: percentage }));
        break;

      default:
        break;
    }
  };

  const uploadToS3 = (inputFile, docType) => {
    if (inputFile) {
      let promise = new Promise(async (resolve, reject) => {
        let payload = {
          file_name: inputFile.name,
          type: inputFile.type,
          document_type: docType,
        };

        const response = await ApiService('/student/upload-document', `POST`, payload, true);
        if (response.data) {
          uploadUsingSignedUrl(response.data.data.signedUrl, inputFile, docType)
            .then((res) => {
              resolve(true);
            })
            .catch((error) => {});
        }
      });
    }
  };

  const uploadUsingSignedUrl = async (url, data, docType) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', data.type);
    var file = data;
    const xhr = new XMLHttpRequest();
    xhr.upload.onprogress = (event) => {
      setLoader(docType, event.loaded, event.total);
    };
    xhr.upload.onload = () => {
      if (docType == 'pan_card') {
        setPanCard((old) => ({ ...old, placeholder: data.name }));
      } else if (docType == 'aadhar_card') {
        setAadhaarCard((old) => ({ ...old, placeholder: data.name }));
      } else if (docType == 'qualification_certificate') {
        setQualificationCertificate((old) => ({ ...old, placeholder: data.name }));
      } else if (docType == 'hsc_certificate') {
        setHSCCertificate((old) => ({ ...old, placeholder: data.name }));
      } else if (docType == 'ssc_certificate') {
        setSSCCertificate((old) => ({ ...old, placeholder: data.name }));
      }
      return Promise.resolve(true);
    };
    xhr.onerror = () => {};

    xhr.open('PUT', url);
    xhr.setRequestHeader('Content-Type', data.type);
    xhr.send(file);
  };

  return (
    <>
      <div className="my-4">
        <p className="note">
          Note: Kindly refer <span className="text-secondary">Max: 2 MB, Mini: 500 KB</span> file
          size and format must be JPEG, JPG, PNG, PDF, ZIP file while uploading the documents.
        </p>
        <Row className="my-2">
          <Col>
            <div
              className={`upload-container ${panCard.percentage > 0 ? 'uploading' : ''} ${
                panCard.percentage == 100 ? 'success' : ''
              }`}>
              <FieldLabel label="PAN Card" property={panCard} />
              <div className="upload-btn">
                <ActionButtons
                  fileKey="pan_card"
                  property={panCard}
                  viewDocument={viewDocument}
                  deleteDocument={deleteDocument}
                  uploadFile={uploadFile}
                />
              </div>
            </div>
          </Col>
          <Col>
            <div
              className={`upload-container ${aadhaarCard.percentage > 0 ? 'uploading' : ''} ${
                aadhaarCard.percentage == 100 ? 'success' : ''
              }`}>
              <FieldLabel label="Aadhaar Card" property={aadhaarCard} />
              <div className="upload-btn">
                <ActionButtons
                  fileKey="aadhar_card"
                  property={aadhaarCard}
                  viewDocument={viewDocument}
                  deleteDocument={deleteDocument}
                  uploadFile={uploadFile}
                />
              </div>
            </div>
          </Col>
          <Col>
            <div
              className={`upload-container ${
                qualificationCertificate.percentage > 0 ? 'uploading' : ''
              } ${qualificationCertificate.percentage == 100 ? 'success' : ''}`}>
              <FieldLabel
                label="Latest Qualification Certificate"
                property={qualificationCertificate}
              />
              <div className="upload-btn">
                <ActionButtons
                  fileKey="qualification_certificate"
                  property={qualificationCertificate}
                  viewDocument={viewDocument}
                  deleteDocument={deleteDocument}
                  uploadFile={uploadFile}
                />
              </div>
            </div>
          </Col>
        </Row>

        <Row className="my-4">
          <Col>
            <div
              className={`upload-container ${hscCertificate.percentage > 0 ? 'uploading' : ''} ${
                hscCertificate.percentage == 100 ? 'success' : ''
              }`}>
              <FieldLabel label="HSC Certificate" property={hscCertificate} />
              <div className="upload-btn">
                <ActionButtons
                  fileKey="hsc_certificate"
                  property={hscCertificate}
                  viewDocument={viewDocument}
                  deleteDocument={deleteDocument}
                  uploadFile={uploadFile}
                />
              </div>
            </div>
          </Col>
          <Col>
            <div
              className={`upload-container ${sscCertificate.percentage > 0 ? 'uploading' : ''} ${
                sscCertificate.percentage == 100 ? 'success' : ''
              }`}>
              <FieldLabel label="SSC Certificate" property={sscCertificate} />
              <div className="upload-btn">
                <ActionButtons
                  fileKey="ssc_certificate"
                  property={sscCertificate}
                  viewDocument={viewDocument}
                  deleteDocument={deleteDocument}
                  uploadFile={uploadFile}
                />
              </div>
            </div>
          </Col>
          <Col>
            <div className="upload-container tc">
              <div className="uploadbtn-text">
                <div>
                  <h3>
                    PAP Terms & Conditions <MandatorySymbol />
                  </h3>
                  <p>(Read & Sign the payment and placement T&C)</p>
                </div>
              </div>
              <div className="upload-btn sign-btn">
                <img src={signDoc}></img>
                <p className="sign">Sign</p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default KYCDocuments;
