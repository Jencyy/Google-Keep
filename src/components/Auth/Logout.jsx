import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import Button from '@mui/material/Button';

const Logout = () => {
    const { logout } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <Button onClick={handleLogout} variant="contained" color="secondary">
            Logout
        </Button>
    );
};

export default Logout;
