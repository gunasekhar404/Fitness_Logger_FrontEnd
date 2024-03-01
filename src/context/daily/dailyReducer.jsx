const DailyReducer=(state, action) => {
    switch (action.type) {
      case "ADD_DAILY":
        return {
          ...state,
          daily: [...(action.payload.sort((a,b)=>new Date(a.date)-new Date(b.date)))],
          loading: false,
        };
      case "GET_DAILY":
        return {
          ...state,
          daily:  [...(action.payload.sort((a,b)=>new Date(a.date)-new Date(b.date)))],
          loading: false,
        };

    case "SET_SELECTEDDAILY":
        return {
          ...state,
          selectedDaily: action.payload,
        };

    case "SET_ACTIVITY":
        return {
          ...state,
          activity: action.payload,
        };

        case "SET_TIME":
            return {
              ...state,
              time: action.payload,
            };   

      case "SET_LOADING":
        return {
          ...state,
          loading: true,
        };

        case "DAILY_ERROR":
          return {
            ...state,
            error:action.payload
          };
      default:
        return state;
    }


  };

  export default DailyReducer;