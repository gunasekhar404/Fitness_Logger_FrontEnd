import React, { useReducer } from "react";
import MenuReducer from "./menuReducer";
import MenuContext from "./menuContext";

function MenuAction(props) {

  const MenuInitialState = {
    menu: false,
  };

  const [state, dispatch] = useReducer(MenuReducer, MenuInitialState);

  const setToggle = () => {
    dispatch({ type: "TOGGLE", payload: !state.menu });
  };

  return (
    <MenuContext.Provider
      value={{
        menu: state.menu,
        setToggle,
      }}
    >
      {props.children}
    </MenuContext.Provider>
  );
}

export default MenuAction;