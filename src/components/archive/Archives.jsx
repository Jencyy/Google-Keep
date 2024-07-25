import { Box, Grid, styled } from '@mui/material';
import React, { useContext } from 'react';
import Archive from './Archive';
import { DataContext } from '../context/DataProvider';

const Archives = () => {
    const DrawerHeader = styled('div')(({ theme }) => ({
        ...theme.mixins.toolbar,
    }));

    const { archiveNotes } = useContext(DataContext);

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ p: 3, width: '100%' }}>
                <DrawerHeader />
                <Grid container style={{ marginTop: 16 }}>
                    {archiveNotes.map(note => (
                        <Grid item key={note.id}>
                            <Archive note={note} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}

export default Archives;
