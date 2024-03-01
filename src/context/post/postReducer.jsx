const  PostReducer=(state, action) => {
    switch (action.type) {
      case "ADD_POST":
        return {
          ...state,
          posts: [action.payload, ...state.posts],
          postLoading: false,
        };
      case "GET_POSTS":
        return {
          ...state,
          posts: action.payload,
          postLoading: false,
        };
      case "UPDATE_POST":
        return {
          ...state,
          posts: state.posts.map((post) =>
            post._id === action.payload._id ? action.payload : post
          ),
          postLoading: false,
        };
      case "DELETE_POST":
        return {
          ...state,
          posts: state.posts.filter((post) => post._id !== action.payload),
          postLoading: false,
        };

      case "POST_ERROR":
        return {
          ...state,
          error: action.payload,
          postLoading: false,
        };
      case "SET_CURRENT":
        return {
          ...state,
          currentPost: action.payload,
        };

      case "SET_SELECTED_POST":
        return {
          ...state,
          selectedPost:action.payload,
        };


            case "SET_SELECTED_DATE":
        return {
          ...state,
          selectedDate: action.payload,
        };


      case "SET_LOADING":
        return {
          ...state,
          postLoading: true,
        };
      default:
        return state;
    }


  };

  export default PostReducer