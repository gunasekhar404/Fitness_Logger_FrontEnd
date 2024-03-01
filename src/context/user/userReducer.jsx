const UserReducer = (state, action) => {
    switch (action.type) {
      case "GET_USER":
        return {
          ...state,
          user: { ...action.payload },
        };
  
      case "UPDATE_USER":
        return {
          ...state,
          user: action.payload,
        };
      case "USER_ERROR":
        return {
          ...state,
          error: action.payload,
        };
      case "LOADING":
        return {
          ...state,
          loading: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default UserReducer;