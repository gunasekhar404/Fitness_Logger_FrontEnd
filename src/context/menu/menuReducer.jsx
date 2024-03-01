const MenuReducer = (state, action) => {
    switch (action.type) {
      case "TOGGLE":
        return {
          ...state,
          menu: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default MenuReducer;