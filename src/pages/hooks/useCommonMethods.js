import { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import { openToaster } from "../../redux/actions/ToastAction";
import { useFormik } from "formik";
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { femaleIcon, maleIcon } from '../../assets/images';
import { setLoading } from '../../redux/actions/LoaderActions';
import { openToaster } from '../../redux/actions/ToastAction';


export const useCommonMethods = ()=>{

    const [page, setPage] = useState();
    const [stepperTitle, setStepperTitle] = useState('');
    const [mobileState, setMobileNumber] = useState({ phone: '', data: '' });
    const [whatsAppState, setWhatsAppNumber] = useState({ phone: '', data: '' });
    const [genderValue, setGenderValue] = useState('');
    const [courseDetails, setCourseDetails] = useState({});
    const [EducationalDetails, setEducationalDetails] = useState({});
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [isLoading, setIsLoading] = useState(false);
    const [testResults, settestResults] = useState('');
    const [orderData, setOrderData] = useState();
    const [isNextLoading, setIsNextLoading] = useState(false);
    const [applicationDetails, setApplicationDetails] = useState();
    const [batches, setBatches] = useState([]);
    const [userData, setUserData] = useState();
    const [birthInfo, setBirthInfo] = useState();
    const [initData, setInitData] = useState();
    const [areDocumentsSubmitted, setAreDocumentsSubmitted] = useState(true);
    const handleAllDocumentsSubmitted = (state) => {
      setAreDocumentsSubmitted(state);
    };
  
    const [selectedBatch, setSelectedBatch] = useState();
    const [worldLineStatus, setWorldLineStatus] = useState();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();
    const params = useParams();
  
    const fetchUserDetails = async (uid) => {
      let personalDetails = {};
      let educationalDetails = {};
      const userDetails = await ApiService(`/user/${uid}/detail`, 'GET', {}, true);
      const birthInfo = userDetails?.data?.data?.userProfile?.information_data;
      setUserData(userDetails?.data?.data?.user);
      setInitialData(userDetails?.data?.data?.user, birthInfo);
  
      personalDetails = userDetails?.data?.data?.userProfile?.personal_details ?? personalDetails;
      educationalDetails.education_details =
        userDetails?.data?.data?.userProfile?.education_details ?? educationalDetails;
      educationalDetails.work_details = userDetails?.data?.data?.userProfile?.work_details ?? [];
      nextPageNumber(0);
      if (!isEmpty(personalDetails)) {
        setPersonalDetailsInForm(personalDetails);
      }
      if (!isEmpty(educationalDetails)) {
        setEducationalDetails(educationalDetails);
      }
    };
  
    const setPersonalDetailsInForm = (details) => {
      formik.setValues(details);
      setGenderValue(details?.gender);
    };
  
    const fetchCourseDetails = async (params) => {
      const { courseVariantSlug } = params;
      const res = await ApiService(`courses/course_url/${courseVariantSlug}/detail`);
      return res?.data?.data?.course;
    };
  
    const setInitialData = (initData, birthInfo, details) => {
      setBirthInfo(birthInfo);
      formik.setValues({
        email: initData?.email,
        mobile_number: initData?.phone,
        whatsapp_number: initData?.phone,
        full_name: user?.displayName,
        birth_date: birthInfo?.birth_date ? birthInfo?.birth_date : '',
        birth_month: birthInfo?.birth_month ? birthInfo?.birth_month : '',
        birth_year: birthInfo?.birth_year ? birthInfo?.birth_year : '',
      });
      setMobileNumber({ phone: details?.phone });
    };
  
    const fetchInitialData = async (uid) => {
      setIsLoading(true);
      const courseData = state ? state : await fetchCourseDetails(params);
      setCourseDetails(courseData);
      fetchUserDetails(uid);
      if (courseDetails?.course_id) {
        await fetchApplicationDetails(uid, courseData?.id);
      }
      fetchVariantBatches(courseData?.id);
      setIsLoading(false);
    
    };

    const fetchApplicationDetails = async (uid, courseId) => {
      const payload = {
        uid: uid,
        course_id: courseDetails?.course_id,
      };
      let applicationDetails = await ApiService(
        '/student/application/detail-by-user-course',
        `POST`,
        payload,
        true
      );
      if (applicationDetails?.data?.data.application) {
        const { application_stage, m_applicationstatus, m_totalscore, m_candidatescore } =
          applicationDetails?.data?.data.application;
        const obj = {
          applicationStatus: m_applicationstatus,
          marks: ((m_candidatescore / m_totalscore) * 100).toFixed(2),
        };
        settestResults(obj);
        setApplicationDetails(applicationDetails?.data?.data.application);
        if (application_stage === 'personal_details') {
          nextPageNumber(1);
        } else if (application_stage === 'education_details') {
          nextPageNumber(2);
        } 
        else if (application_stage === 'test_result') {
          nextPageNumber(3);
        } else if (application_stage === 'application_status') {
          nextPageNumber(4);
        } else if (
          application_stage === 'payment_status' &&
          m_applicationstatus === 'Payment Failed'
        ) {
          nextPageNumber(4);
        } else if (
          application_stage === 'payment_status' &&
          m_applicationstatus === 'Payment Successfull'
        ) {
          nextPageNumber(6);
        }
      }
    };
  
    useEffect(() => {
      dispatch(setLoading(true));
      window.scrollTo(0, 0);
      fetchInitialData(user?.uid);
      dispatch(setLoading(false));
    }, [courseDetails?.course_title]);
  
    const fetchVariantBatches = async (courseVariantId) => {
      const res = await ApiService(`courses/${courseVariantId}/batch/list`);
      if (res?.data.code === 200) {
        setBatches(res.data.data.result);
      }
    };
  
    const formPersonalDetailsPayload = async (personalDetails) => {
      setIsNextLoading(true);
      const payload = {
        uid: user?.uid,
        course_id: courseDetails?.course_id,
        course_title: courseDetails?.course_title,
        course_duration: courseDetails?.duration,
        course_start_date: new Date(courseDetails?.start_date).toLocaleDateString(),
        personal_details: personalDetails,
      };
      const response = await ApiService('/student/personal-details', `POST`, payload, true);
  
      setIsNextLoading(false);
      if (response?.data.code === 200) {
        dispatch(
          openToaster({
            show: true,
            header: 'Success!',
            variant: 'info',
            body: 'Personal details was saved successfully!',
          })
        );
        nextPage();
      }
    };
  
    const phoneRegExp = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{6})/;
  
    const formik = useFormik({
      validationSchema: Yup.object().shape({
        full_name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        mobile_number: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required(),
        whatsapp_number: Yup.string().matches(phoneRegExp, 'Whatsapp number is not valid').required(),
        gender: Yup.string().required(),
        birth_date: Yup.number(),
        birth_month: Yup.number(),
        birth_year: Yup.number().required('Year of birth is requied'),
        guardian_details: Yup.string(),
      }),
      validate: (values) => {
        let errors = {};
        if (!values?.mobile_number) {
          errors.mobile_number = '*Mobile number required';
        }
        if (!values?.whatsapp_number) {
          errors.whatsapp_number = '*Whatsapp number required';
        }
        return errors;
      },
      onSubmit: (values) => {
        const { full_name, mobile_number, whatsapp_number, guardian_details, ...rest } = values;
  
        const personalDetails = {
          full_name: full_name,
          email: values?.email,
          gender: values?.gender,
          mobile_number: mobile_number,
          mobile_cc: '+91', //`+${mobileState?.data.dialCode}`,
          whatsapp_number: whatsapp_number,
          whatsapp_cc: '+91', //`+${whatsAppState?.data.dialCode}`,
          guardian_details: guardian_details,
          birth_year: values.birth_year,
          ...(Number(values.birth_date) && { birth_date: Number(values.birth_date) }),
          ...(Number(values.birth_month) && { birth_month: Number(values.birth_month) }),
        };
        formPersonalDetailsPayload(personalDetails);
      },
    });
  
    const nextPageNumber = (pageNumber) => {
      switch (pageNumber) {
        case 0:
          setPage(0);
          setStepperTitle('Personal Details');
          break;
        case 1:
          setPage(1);
          setStepperTitle('Education & Work Details');
          break;
        case 2:
          setPage(2);
          setStepperTitle('Entrance Test');
          break;
        case 3:
          setPage(3);
          setStepperTitle('Test Result');
          break;
        case 4:
          setPage(4);
          setStepperTitle('Application Status');
          break;
        case 5:
          setPage(5);
          setStepperTitle('Payment');
          break;
        case 6:
          setPage(6);
          setStepperTitle('KYC & Documents');
          break;
        case 7:
          setPage(7);
          setStepperTitle('Enrollment Status');
          break;
        default:
          setPage(0);
      }
    };
  
    const returnToDashboard = () => {
      navigate('/dashboard');
    };
    const nextPage = () => {
      const nextPage = page + 1;
      nextPageNumber(nextPage);
    };
  
    const copyFromMobileNumber = (value) => {
      if (value.target.checked) {
        setWhatsAppNumber({ phone: mobileState.phone, data: mobileState.data });
        formik.setFieldValue('whatsapp_number', mobileState.phone);
      }
    };
  
    const genderOptions = [
      { name: 'Male', value: 'male', icon: maleIcon },
      { name: 'Female', value: 'female', icon: femaleIcon },
    ];
  
    return {
        genderOptions,
        selectedBatch,
        worldLineStatus,
        copyFromMobileNumber,
        nextPage,
        returnToDashboard,
        nextPageNumber,
    }
}