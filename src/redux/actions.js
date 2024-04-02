export const FETCH_PHOTOS_SUCCESS = "FETCH_PHOTOS_SUCCESS";
export const FETCH_PHOTOS_ERROR = "FETCH_PHOTOS_ERROR";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";
export const EDIT_PHOTO = "EDIT_PHOTO";

export const fetchPhotosSuccess = (photos) => ({
  type: FETCH_PHOTOS_SUCCESS,
  payload: photos,
});

export const fetchPhotosError = (error) => ({
  type: FETCH_PHOTOS_ERROR,
  payload: error,
});

export const addFavorite = (photo) => ({
  type: ADD_FAVORITE,
  payload: photo,
});

export const removeFavorite = (photoId) => ({
  type: REMOVE_FAVORITE,
  payload: photoId,
});

export const toggleFavorite = (photo) => {
  return (dispatch, getState) => {
    const { favorites } = getState(); // Get current favorites state
    const isFavorite = favorites.some((fav) => fav.id === photo.id);

    if (isFavorite) {
      dispatch(removeFavorite(photo.id));
    } else {
      dispatch(addFavorite(photo));
    }
  };
};
export const editPhoto = (editedPhoto) => {
  return {
    type: "EDIT_PHOTO",
    payload: editedPhoto,
  };
};
