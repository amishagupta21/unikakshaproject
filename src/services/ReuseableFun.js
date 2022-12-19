import ApiService from './ApiService';

export const getColleges = async () => {
  const getCollegeRes = await ApiService(`on-boarding/college/list`, `get`);
  const tempArray = [];
  getCollegeRes.data.data?.map(college => {
    Object.assign(college, { label: college.lookup_value, value: college._id });
    tempArray.push(college);
  });
  return tempArray;
};

export const getWorkingPosition = async () => {
  const getWorkingPositionRes = await ApiService(`on-boarding/working-position/list`, `get`);
  const tempArray = [];
  getWorkingPositionRes.data.data?.map(position => {
    Object.assign(position, { label: position.lookup_value, value: position._id });
    tempArray.push(position);
  });
  return tempArray;
};
