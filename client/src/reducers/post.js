import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
} from "../actions/types";
const initialState = {
  post: [],
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };

    case ADD_POST:
      return {
        ...state,
        // A copy of posts adding the payload(the new post)
        // Put the new post first
        posts: [payload, ...state.posts],
        loading: false,
      };

    case DELETE_POST:
      return {
        ...state,
        // The payload is just the id in this case
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        // The payload mus have an object with the likes array and an id of the related post
        posts: state.posts.map((post) =>
          post._id === payload.postId ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    default:
      return state;
  }
}
