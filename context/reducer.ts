import { SIGNED_IN, SIGNED_OUT } from "./actions";

const reducer = (state, action) => {
  if (action.type === SIGNED_IN) {
    return {
      ...state,
      isSignedIn: true,
    };
  }
  if (action.type === SIGNED_OUT) {
    return {
      ...state,
      isSignedIn: false,
    };
  }
  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
