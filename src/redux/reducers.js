import {
  FETCH_PHOTOS_SUCCESS,
  FETCH_PHOTOS_ERROR,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  EDIT_PHOTO,
} from "./actions";
import { combineReducers } from "redux";

const initialPhotosState = {
  loading: false,
  error: null,
  data: [],
};

const photosReducer = (state = initialPhotosState, action) => {
  switch (action.type) {
    case FETCH_PHOTOS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case FETCH_PHOTOS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: [], // Clear photos data on error
      };
    default:
      return state;
  }
};

const initialFavoritesState = [];

const favoritesReducer = (state = initialFavoritesState, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      return [...state, action.payload]; // Add photo to favorites array
    case REMOVE_FAVORITE:
      return state.filter((fav) => fav.id !== action.payload); // Remove photo from favorites array
    default:
      return state;
  }
};

const editModalReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_PHOTO:
      return {
        ...state,
        editedPhoto: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  photos: photosReducer,
  favorites: favoritesReducer,
  editModal: editModalReducer,
});

export default rootReducer;
