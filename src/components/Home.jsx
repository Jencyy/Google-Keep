// src/components/Home.js
import React from 'react';
import SwipeDrawer from './SwipeDrawer';
import Notes from './notes/Notes';
import { Box } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DeleteNotes from './delete/DeleteNotes';
import Archives from './archive/Archives';
import { AuthProvider } from '../components/Auth/AuthContext';

const Home = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Box style={{ display: 'flex', width: '100%' }}>
                    <SwipeDrawer />
                    <Routes>
                        <Route path="/" element={<Notes />} />
                        <Route path="/archive" element={<Archives />} />
                        <Route path="/reminder" element={<DeleteNotes />} />
                        <Route path="/bin" element={<DeleteNotes />} />
                        <Route path="/edit" element={<DeleteNotes />} />
                    </Routes>
                </Box>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default Home;
