import {
    Card,
    CardActions,
    CardContent,
    Typography,
    IconButton,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
  } from "@mui/material";
  import React, { useContext, useState } from "react";
  import RestoreFromTrash from "@mui/icons-material/RestoreFromTrash";
  import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

  import { DataContext } from "../context/DataProvider";
import { CheckCircleRounded } from "@mui/icons-material";
  
  const DeleteNote = ({ note }) => {
    const { deleteNotes, setDeleteNotes, setNotes, permanentlyDeleteNote } =
      useContext(DataContext);
    const [open, setOpen] = useState(false);
  
    const handleRestoreNote = () => {
      const updatedDeleteNotes = deleteNotes.filter(
        (data) => data.id !== note.id
      );
      setDeleteNotes(updatedDeleteNotes);
      setNotes((prevArr) => [note, ...prevArr]);
    };
  
    const handlePermanentDelete = () => {
      permanentlyDeleteNote(note);
    };
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <Card
        sx={{
          width: 240,
          margin: 1,
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            transform: "translateY(-4px)",
            overflow: 'visible',
          },
          "&:hover .card-actions": {
            display: "flex",
          },
          "&:hover .check-icon": {
            display: "block",
          },
        }}
      >
        {note.imageUrl && (
          <Box
            component="img"
            src={note.imageUrl}
            alt="Note"
            sx={{
              width: "100%",
              height: 120,
              objectFit: "cover",
              borderBottom: "1px solid #e0e0e0",
            }}
          />
        )}
        <IconButton
          className="check-icon"
          sx={{
            position: "absolute",
            top: -15,
            left: -15,
            display: "none",
            color: "black",
         
            zIndex: 99,
          }}
        >
          <CheckCircleRounded fontSize="small" />
        </IconButton>
        <CardContent
          sx={{
            padding: 2,
            paddingBottom: "4rem",
          }}
        >
          <Typography
            variant="h6"
            noWrap
            sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {note.heading}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            noWrap
            sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {note.text}
          </Typography>
        </CardContent>
        <CardActions
          className="card-actions"
          sx={{
            display: "none",
            width: "100%",
            padding: 1,
            backgroundColor: "white",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
           
            }}
          >
            <IconButton
              size="small"
              onClick={handleRestoreNote}
              sx={{ color: "black" }}
            >
              <RestoreFromTrash fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={handleClickOpen}
              sx={{ color: "black" }}
            >
              <DeleteForeverIcon fontSize="small" />
            </IconButton>
          </Box>
        </CardActions>
  
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to permanently delete this note? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handlePermanentDelete} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    );
  };
  
  export default DeleteNote;
  