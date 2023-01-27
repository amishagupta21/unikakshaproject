import React, { useEffect } from 'react';
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useDispatch } from 'react-redux';
import { circleTick, Icon, signDoc, trash, upload, view } from '../../../assets/images';
import ApiService from '../../../services/ApiService';
import { openToaster } from '../../../redux/actions/ToastAction';
import './KYCDocuments.scss';
import { firebase } from '../../../firebase/firebase';
import { setLoading } from '../../../redux/actions/LoaderActions';

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

const ActionButtons = ({
  property,
  fileKey,
  uploadFile,
  viewDocument,
  deleteDocument,
  fileName,
}) => {
  return (
    <>
      {property.percentage == 0 && !fileName && (
        <>
          <p onClick={() => uploadFile(fileKey)}>
            {' '}
            <img src={upload}></img>Upload
          </p>
        </>
      )}
      {(property.percentage == 100 || fileName) && (
        <>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id={`view-tooltip`}>View Document!</Tooltip>}>
            <img onClick={() => viewDocument(fileKey)} height="12rem" src={view}></img>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id={`delete-tooltip`}>Delete Document!</Tooltip>}>
            <img onClick={() => deleteDocument(fileKey)} height="20rem" src={trash}></img>
          </OverlayTrigger>
        </>
      )}
    </>
  );
};

const FieldLabel = ({ label, property, fileName }) => {
  const fn = fileName?.split('/').pop();
  const fieldPlaceHolder = fileName ? fn : property.placeholder;

  return (
    <>
      <div className="uploadbtn-text">
        {(property.percentage == 100 || fileName) && <CirleTick />}
        <div>
          <h3>
            {label} <MandatorySymbol />
          </h3>
          {property.percentage == 0 || property.percentage == 100 ? (
            <p>{fieldPlaceHolder}</p>
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
  const [kycDetails, setKycDetails] = React.useState();

  const dispatch = useDispatch();

  const fetchInitialData = () => {
    const uid = firebase.auth().currentUser.uid;
    ApiService(`/user/${uid}/detail`, 'GET', {}, true)
      .then((response) => {
        setKycDetails(response.data.data.userProfile.kyc);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

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

  const deleteAPI = async (docType) => {
    dispatch(setLoading(true));
    const response = await ApiService(
      '/student/delete-document',
      `DELETE`,
      { document_type: docType },
      true
    );
    dispatch(setLoading(false));
    return response.data.data.deleted;
  };

  const viewDocument = async (fileKey) => {
    dispatch(setLoading(true));
    const result = await ApiService(
      '/student/get-kyc-singed-doc',
      `POST`,
      { document_type: fileKey },
      true
    );
    window.open(result?.data?.data?.signedUrl);
    dispatch(setLoading(false));

  };

  const deleteDocument = async (docType) => {
    if (await deleteAPI(docType)) {
      switch (docType) {
        case 'pan_card':
          setPanCard({
            placeholder: staticContents.panCardPlaceholder,
            percentage: 0,
          });
          setKycDetails({...kycDetails, pan_card: ''})
          break;

        case 'aadhar_card':
          setAadhaarCard({
            placeholder: staticContents.aadhaarPlaceholder,
            percentage: 0,
          });
          setKycDetails({...kycDetails, aadhar_card: ''})
          break;

        case 'qualification_certificate':
          setQualificationCertificate({
            placeholder: staticContents.qcPlaceholder,
            percentage: 0,
          });
          setKycDetails({...kycDetails, qualification_certificate: ''})
          break;

        case 'hsc_certificate':
          setHSCCertificate({
            placeholder: staticContents.hscPlaceholder,
            percentage: 0,
          });
          setKycDetails({...kycDetails, hsc_certificate: ''})
          break;

        case 'ssc_certificate':
          setSSCCertificate({
            placeholder: staticContents.sscPlaceholder,
            percentage: 0,
          });
          setKycDetails({...kycDetails, ssc_certificate: ''})
          break;

        default:
          break;
      }
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
    dispatch(setLoading(true));
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
    dispatch(setLoading(false));
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
                (panCard.percentage == 100 || kycDetails?.pan_card) ? 'success' : ''
              }`}>
              <FieldLabel label="PAN Card" property={panCard} fileName={kycDetails?.pan_card} />
              <div className="upload-btn">
                <ActionButtons
                  fileKey="pan_card"
                  property={panCard}
                  viewDocument={viewDocument}
                  deleteDocument={deleteDocument}
                  uploadFile={uploadFile}
                  fileName={kycDetails?.pan_card}
                />
              </div>
            </div>
          </Col>
          <Col>
            <div
              className={`upload-container ${aadhaarCard.percentage > 0 ? 'uploading' : ''} ${
                (aadhaarCard.percentage == 100 || kycDetails?.aadhar_card) ? 'success' : ''
              }`}>
              <FieldLabel
                label="Aadhaar Card"
                property={aadhaarCard}
                fileName={kycDetails?.aadhar_card}
              />
              <div className="upload-btn">
                <ActionButtons
                  fileKey="aadhar_card"
                  property={aadhaarCard}
                  viewDocument={viewDocument}
                  deleteDocument={deleteDocument}
                  uploadFile={uploadFile}
                  fileName={kycDetails?.aadhar_card}
                />
              </div>
            </div>
          </Col>
          <Col>
            <div
              className={`upload-container ${
                qualificationCertificate.percentage > 0 ? 'uploading' : ''
              } ${(qualificationCertificate.percentage == 100 || kycDetails?.qualification_certificate) ? 'success' : ''}`}>
              <FieldLabel
                label="Latest Qualification Certificate"
                property={qualificationCertificate}
                fileName={kycDetails?.qualification_certificate}
              />
              <div className="upload-btn">
                <ActionButtons
                  fileKey="qualification_certificate"
                  property={qualificationCertificate}
                  viewDocument={viewDocument}
                  deleteDocument={deleteDocument}
                  uploadFile={uploadFile}
                  fileName={kycDetails?.qualification_certificate}
                />
              </div>
            </div>
          </Col>
        </Row>

        <Row className="my-4">
          <Col md={4}>
            <div
              className={`upload-container ${hscCertificate.percentage > 0 ? 'uploading' : ''} ${
                (hscCertificate.percentage == 100 || kycDetails?.hsc_certificate) ? 'success' : ''
              }`}>
              <FieldLabel
                label="HSC Certificate"
                property={hscCertificate}
                fileName={kycDetails?.hsc_certificate}
              />
              <div className="upload-btn">
                <ActionButtons
                  fileKey="hsc_certificate"
                  property={hscCertificate}
                  viewDocument={viewDocument}
                  deleteDocument={deleteDocument}
                  uploadFile={uploadFile}
                  fileName={kycDetails?.hsc_certificate}
                />
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div
              className={`upload-container ${sscCertificate.percentage > 0 ? 'uploading' : ''} ${
                (sscCertificate.percentage == 100 || kycDetails?.ssc_certificate) ? 'success' : ''
              }`}>
              <FieldLabel
                label="SSC Certificate"
                property={sscCertificate}
                fileName={kycDetails?.ssc_certificate}
              />
              <div className="upload-btn">
                <ActionButtons
                  fileKey="ssc_certificate"
                  property={sscCertificate}
                  viewDocument={viewDocument}
                  deleteDocument={deleteDocument}
                  uploadFile={uploadFile}
                  fileName={kycDetails?.ssc_certificate}
                />
              </div>
            </div>
          </Col>
          {/* <Col>
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
          </Col> */}
        </Row>
      </div>
    </>
  );
};

export default KYCDocuments;
