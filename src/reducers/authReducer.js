const initialState = {
  checking: true,
  // uid: null,
  // name: null
}

export const authReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'asdf':
      return {
        ...state
      }
  
    default:
      return state
  }

}