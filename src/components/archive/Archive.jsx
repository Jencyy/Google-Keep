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
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { UnarchiveOutlined } from "@mui/icons-material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { DataContext } from "../context/DataProvider";

const Archive = ({ note }) => {
  const { unarchiveNote, deleteNote } = useContext(DataContext);
  const [open, setOpen] = useState(false);

  const handleUnarchiveNote = async () => {
    await unarchiveNote(note);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    console.log('delel');
    deleteNote(note);
    handleClose();
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
          borderRadius: 2,
        },
        "&:hover .pin-icon": {
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
        className="pin-icon"
        sx={{
          position: "absolute",
          top: -15,
          left: -15,
          display: "none",
          color: "black",
          zIndex: 99,
        }}
      >
        <CheckCircleIcon />
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
          padding: 1,
          backgroundColor: "white"
        }}
      >
        <IconButton
          size="small"
          onClick={handleUnarchiveNote}
          sx={{ color: "black" }}
        >
          <UnarchiveOutlined fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={handleClickOpen}
          sx={{ color: "black" }}
        >
          <DeleteOutlineOutlinedIcon fontSize="small" />
        </IconButton>
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
            Are you sure you want to delete this note? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Archive;
