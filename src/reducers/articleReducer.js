import { SET_LOADING_STATUS, GET_ARTICLES } from "../actions/actionType";
const INITIAL_STATE = {
  loading: false,
  articles: [],
};
const articleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOADING_STATUS:
      return {
        ...state,
        loading: action.status,
      };
    case GET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
      };
    default:
      return state;
  }
};
export default articleReducer;
