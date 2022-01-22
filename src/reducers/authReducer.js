import { types } from "../types/types"

const initialState = {
  checking: true,
  // uid: null,
  // name: null
}

export const authReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        ...action.payload,
        checking: false,
      }
    case types.authCheckingFinish:
      // prev state is initialState so uid and name doNot exist
      return {
        ...state,
        // uid: null,
        // name: null,
        checking: false,
      }
  
    default:
      return state
  }

}