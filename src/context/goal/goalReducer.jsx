const GoalReducer= (state, action) => {
    switch (action.type) {
      case "SET_CHART":
        return {
          ...state,
          value: action.payload,
        };

        case "SET_CURRENT":
          return {
            ...state,
            currentGoal: action.payload,
          };
  
  
      case "GET_GOALS":
        return {
          ...state,
          goals: action.payload,
          goalLoading: false,
        };
  
  
      case "SET_LOADING":
        return {
          ...state,
          goalLoading: true,
        };
      case "GOAL_ERROR":
        return {
          ...state,
          error: action.payload,
          goalLoading: false,
        };
  
      default:
        return state;
    }
  };

  export default GoalReducer
  