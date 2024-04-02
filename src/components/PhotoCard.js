import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditModal from "./EditModal";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { toggleFavorite } from "../redux/actions";

function PhotoCard({ photo }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const isFavorite = favorites.some((fav) => fav.id === photo.id);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(photo.title);
  const [editedDescription, setEditedDescription] = useState(photo.description);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(photo));
  };

  const handleSaveChanges = (title, description) => {
    setEditedTitle(title);
    setEditedDescription(description);
  };

  return (
    <Card sx={{ width: 350, height: 420 }}>
      <CardMedia sx={{ height: 180 }} image={photo.url} title={photo.title} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {editedTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {editedDescription}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleToggleFavorite}>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
        {isEditing && (
          <EditModal
            open={isEditing}
            handleClose={handleCloseModal}
            photo={photo}
            onSaveChanges={handleSaveChanges}
          />
        )}
        <Button size="small" onClick={handleEditClick}>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}

export default PhotoCard;
