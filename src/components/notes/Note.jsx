import React, { useState, useContext } from 'react';
import { Card, CardActions, CardContent, Typography, IconButton, Box } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditNoteModal from '../EditNoteModel';
import { DataContext } from '../context/DataProvider';

function Note({ note }) {
  const { archiveNote, deleteNote } = useContext(DataContext);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleDelete = () => {
    deleteNote(note);
  };

  return (
    <>
      <Card
        sx={{
          width: 240,
          margin: 1,
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            transform: 'translateY(-4px)',
            overflow: 'visible'
          },
          '&:hover .card-actions': {
            display: 'flex',
          },
          '&:hover .pin-icon': {
            display: 'block',
          },
        }}
        onClick={handleOpenEditModal}
      >
        {note.imageUrl && (
          <Box
            component="img"
            src={note.imageUrl}
            alt="Note"
            sx={{
              width: '100%',
            
              objectFit: 'cover',
              borderBottom: '1px solid #e0e0e0',
            }}
          />
        )}
        <IconButton
          className="pin-icon"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            display: 'none',
            color: 'black',
            zIndex: 1,
          }}
        >
          <PushPinOutlinedIcon fontSize="small" />
        </IconButton>
        <IconButton
          className="pin-icon"
          sx={{
            position: 'absolute',
            top: -15,
            left: -15,  
            display: 'none',
            color: 'black',
            zIndex: 99,
          }}
        >
          <CheckCircleIcon fontSize="small" />
        </IconButton>
        <CardContent
          sx={{
            padding: 2,
            paddingBottom: '3rem',
          }}
        >
          <Typography
            variant="h6"
            noWrap
            sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {note.heading}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            noWrap
            sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {note.text}
          </Typography>
        </CardContent>
        <CardActions
          className="card-actions"
          sx={{
            display: 'none',
            width: '100%',
            padding: 1,
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              position:'absolute',
              bottom:0,

              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <IconButton size="small" sx={{ color: 'black' }}>
              <NotificationsOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: 'black' }}>
              <PersonAddAltOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: 'black' }}>
              <PaletteOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: 'black' }}>
              <ImageOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => archiveNote(note)}
              sx={{ color: 'black' }}
            >
              <ArchiveOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={handleDelete}
              sx={{ color: 'black' }}
            >
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: 'black' }}>
              <MoreVertOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </CardActions>
      </Card>

      <EditNoteModal
        open={openEditModal}
        handleClose={handleCloseEditModal}
        note={note}
      />
    </>
  );
}

export default Note;
