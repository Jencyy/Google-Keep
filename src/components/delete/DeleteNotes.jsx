import { Box, Grid, styled } from '@mui/material';
import React, { useContext } from 'react';
import DeleteNote from './DeleteNote';
import { DataContext } from '../context/DataProvider';

const DeleteNotes = () => {
    const DrawerHeader = styled('div')(({ theme }) => ({
        ...theme.mixins.toolbar,
    }));

    const { deleteNotes } = useContext(DataContext);

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ p: 3, width: '100%' }}>
                <DrawerHeader />
                <Grid container style={{ marginTop: 16 }}>
                    {deleteNotes.map(note => (
                        <Grid item key={note.id}>
                            <DeleteNote note={note} />
                        </Grid>
                    ))}
                </Grid> 
            </Box>
        </Box>
    );
}

export default DeleteNotes;
