import { ActionTypes } from '../constants/ActionTypes';

const initializeState = {
  toasterData: {
    show: false,
    header: 'Warning!', 
    variant: 'warning',
    body: 'Error Occured!'
  },
};
const ToasterReducer = (state = initializeState, { type, payload }) => {
  switch (type) {
    case ActionTypes.OPEN_TOASTER:
      return { toasterData: payload };
    default:
      return state;
  }
};

export default ToasterReducer;
