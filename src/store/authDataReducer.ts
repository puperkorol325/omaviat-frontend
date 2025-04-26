import { AuthData } from "../types/authData";

const initialState: AuthData = {
  userID: localStorage.getItem('userID'),
  APIKey: localStorage.getItem('APIKey'),
};

const authDataReducer = (state = initialState, action: { type: string, payload: AuthData}) => {
  switch (action.type) {
    case 'SET_USER_ID':
      return { ...state, userID: action.payload.userID };
    case 'SET_API_KEY':
      return { ...state, APIKey: action.payload.APIKey };
    default:
      return state;
  }
};

export default authDataReducer;