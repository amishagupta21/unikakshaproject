import { ActionTypes } from "../constants/ActionTypes";

const initializeState = {
    skills: [],
    fieldOfStudyList: []
};
const ProfileReducer = (state = initializeState, { type, payload }) => {
    switch (type) {
        case ActionTypes.GET_SKILLS:
            return { ...state, skills: payload };
        case ActionTypes.GET_DEGREE:
            return { ...state, degreeList: payload };
        case ActionTypes.GET_FIELD_OF_STUDY:
            return { ...state, fieldOfStudyList: payload };
        default:
            return state;
    }
};

export default ProfileReducer;
