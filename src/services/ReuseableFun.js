import ApiService from './ApiService';

export const getCollages = async () => {
  const getCollageRes = await ApiService(`on-boarding/college/list`, `get`);
  const tempArray = [];
  getCollageRes.data.data?.map(collage => {
    Object.assign(collage, { label: collage.lookup_value, value: collage._id });
    tempArray.push(collage);
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
