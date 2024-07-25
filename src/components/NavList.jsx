import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Link } from 'react-router-dom';

const NavList = () => {
    const navList = [
        { id: 1, name: 'Notes', icon: <LightbulbOutlinedIcon />,
            route:'/'
         },
        { id: 2, name: 'Reminders', icon: <NotificationsNoneOutlinedIcon />,
            route:'/reminder' },
        { id: 3, name: 'Edit labels', icon: <EditOutlinedIcon /> ,
            route:'/edit'},
        { id: 4, name: 'Archive', icon: <ArchiveOutlinedIcon /> ,
            route:'/archive'},
        { id: 5, name: 'Bin', icon: <DeleteOutlineOutlinedIcon />,
            route:'/bin' }
    ];
    
    return (
        <List>
        {navList.map((list) => (
            <ListItem 
                button 
                key={list.id}
                sx={{
                    '&:hover': {
                        backgroundColor: '#feefc3',
                        color: '#000',
                        
                        borderRadius: '0px 25px 25px 0',
                        '& .MuiListItemIcon-root': {
                            color: 'inherit',
                        },
                      
                    }
                }}
            >
                <Link to={list.route} style={{ textDecoration: 'none', display: 'flex', color: 'inherit' }}>
                    <ListItemIcon>{list.icon}</ListItemIcon>
                    <ListItemText primary={list.name} />
                </Link>
            </ListItem>
        ))}
    </List>
    );
};

export default NavList;
