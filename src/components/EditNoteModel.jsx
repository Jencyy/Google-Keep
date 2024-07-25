import React, { useState, useContext, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton } from '@mui/material';
import { DataContext } from './context/DataProvider';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

const EditNoteModal = ({ open, handleClose, note }) => {
  const { updateNote } = useContext(DataContext);
  const [editedNote, setEditedNote] = useState(note);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setEditedNote(note);
  }, [note]);

  const handleTextChange = (e) => {
    setEditedNote({
      ...editedNote,
      [e.target.name]: e.target.valuea
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    let imageUrl = "";
    if (selectedImage) {
    }
    await updateNote({ ...editedNote, imageUrl });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Edit Note</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          name="heading"
          value={editedNote.heading}
          onChange={handleTextChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Content"
          name="text"
          value={editedNote.text}
          onChange={handleTextChange}
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />
        {editedNote.imageUrl && (
          <img src={editedNote.imageUrl} alt="Note" style={{ width: '100%', marginBottom: 10 }} />
        )}
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          id="image-upload"
          onChange={handleImageChange}
        />
        <label htmlFor="image-upload">
          <IconButton component="span">
            <ImageOutlinedIcon />
          </IconButton>
        </label>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditNoteModal;
