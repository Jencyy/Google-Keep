// src/components/HeaderBar.jsx
import React, { useContext, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AppsIcon from '@mui/icons-material/Apps';
import { TextField, Avatar, Button, Dialog } from '@mui/material';
import { AuthContext } from './Auth/AuthContext'; // Adjust path as needed
import Login from './Auth/Login'; // Adjust path as needed
import SignUp from './Auth/SignUp'; // Adjust path as needed
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Header = styled(MuiAppBar)`
  z-index: 1201;
  background-color: #fff;
  height: 70px;
  box-shadow: inset 0 -1px 0 0 #dadce0;
`;

const Heading = styled(Typography)`
  color: #5f6368;
  font-size: 20px;
  margin-left: 10px;
`;

const Btn = styled(Button)`
  color: #000;
`;

const SearchBar = styled('div')(({ theme }) => `
  display: flex;
  align-items: center;
  min-height: 40px;
  background-color: ${alpha(theme.palette.common.black, 0.05)};
  padding: 0 10px;
  border-radius: ${theme.shape.borderRadius}px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 1px 2px 0 rgb(60, 64, 67, 30%), 0 2px 6px 2px rgb(60, 64, 67, 15%);
  margin: 0 auto;
`);

const RightIcons = styled('div')`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const HeaderBar = ({ open, handleDrawer }) => {
  const { user, logout } = useContext(AuthContext);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const logo = 'https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png';

  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);
  const handleSignUpOpen = () => setSignUpOpen(true);
  const handleSignUpClose = () => setSignUpOpen(false);

  const handleLogoClick = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <>
      <Header open={open}>
        <Toolbar>
          <IconButton onClick={handleDrawer} edge="start" sx={{ marginRight: '15px' }}>
            <MenuIcon />
          </IconButton>
          <img
            src={logo}
            alt="logo"
            style={{ width: 40, cursor: 'pointer' }}
            onClick={handleLogoClick} 
          />
          <Heading>Keep</Heading>
          <SearchBar>
            <SearchOutlinedIcon style={{ color: '#5f6368', paddingRight: '5px' }} />
            <TextField
              placeholder="Search"
              variant="standard"
              InputProps={{ disableUnderline: true }}
              sx={{ width: '100%' }}
            />
          </SearchBar>
          <RightIcons>
            <IconButton>
              <RefreshOutlinedIcon />
            </IconButton>
            <IconButton>
              <ViewAgendaOutlinedIcon />
            </IconButton>
            <IconButton>
              <SettingsOutlinedIcon />
            </IconButton>
            <IconButton style={{ marginLeft: '60px' }}>
              <AppsIcon />
            </IconButton>
            {user ? (
              <>
                <Avatar src={user.photoURL || "https://via.placeholder.com/40"} alt="User Avatar" />
                <Btn onClick={logout} color="inherit">Logout</Btn>
              </>
            ) : (
              <>
                <Btn onClick={handleLoginOpen} color="inherit">Login</Btn>
                <Btn onClick={handleSignUpOpen} color="inherit">Sign Up</Btn>
              </>
            )}
          </RightIcons>
        </Toolbar>
      </Header>
      <Dialog open={loginOpen} onClose={handleLoginClose}>  
        <Login open={loginOpen} onClose={handleLoginClose} />
      </Dialog>
      <Dialog open={signUpOpen} onClose={handleSignUpClose}>
        <SignUp open={signUpOpen} onClose={handleSignUpClose} />
      </Dialog>
    </>
  );
};

export default HeaderBar;
