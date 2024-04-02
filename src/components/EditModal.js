import React, { useState, useMemo } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function EditModal({ open, handleClose, photo, onSaveChanges }) {
  const [editedTitle, setEditedTitle] = useState(photo.title);
  const [editedDescription, setEditedDescription] = useState(photo.description);
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const validateInput = useMemo(
    () => (input) => {
      return /^[A-Za-z .-]+$/.test(input);
    },
    []
  );

  const handleSaveClick = () => {
    if (!validateInput(editedTitle)) {
      setTitleError(true);
      return;
    }
    if (!validateInput(editedDescription)) {
      setDescriptionError(true);
      return;
    }

    if (
      editedTitle === photo.title &&
      editedDescription === photo.description
    ) {
      handleClose();
      return;
    }

    onSaveChanges(editedTitle, editedDescription);
    handleClose();
  };

  const handleCancelClick = () => {
    handleClose();
  };

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
    setTitleError(false);
  };

  const handleDescriptionChange = (e) => {
    setEditedDescription(e.target.value);
    setDescriptionError(false);
  };

  return (
    <Modal open={open} onClose={handleCancelClick}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Edit Photo Details
        </Typography>
        <TextField
          label="Title"
          value={editedTitle}
          onChange={handleTitleChange}
          error={titleError}
          helperText={titleError ? "Title must be in letters" : ""}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={editedDescription}
          onChange={handleDescriptionChange}
          error={descriptionError}
          helperText={descriptionError ? "Description must be in letters" : ""}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <Button
          onClick={handleSaveClick}
          variant="contained"
          color="primary"
          sx={{ mr: 2 }}
        >
          Save
        </Button>
        <Button onClick={handleCancelClick} variant="contained">
          Cancel
        </Button>
      </Box>
    </Modal>
  );
}

export default EditModal;
