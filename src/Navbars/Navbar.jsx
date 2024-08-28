import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, Box, Grid, Menu, MenuItem, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import Cookies from 'js-cookie';

// Styled components for the navigation links
const NavLink = styled(Link)(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  color: '#fff',
  textDecoration: 'none',
  padding: '10px',
  '& span': {
    position: 'relative',
    display: 'inline-block',
  },
  '& span::after': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '2px',
    backgroundColor: '#fff',
    bottom: 0,
    left: 0,
    transform: 'scaleX(0)',
    transformOrigin: 'right',
    transition: 'transform 0.5s ease',
  },
  '&:hover span::after': {
    transform: 'scaleX(1)',
    transformOrigin: 'left',
  },
}));

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const login = () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          setIsLoggedIn(true);
        } catch (error) {
          console.error('Invalid token', error);
          setIsLoggedIn(true);
          Cookies.remove('token');
        }
      } else {
        setIsLoggedIn(true);
      }
    };
    login();
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
    handleClose();
  };

  const drawerItems = ['Home', 'About', 'Services', 'Contact'];

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#111', padding: '0 20px', top: 0, left: 0, right: 0, zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
            Yatramitra
          </Typography>

          {isSmallScreen ? (
            <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Grid container justifyContent="center">
              <Grid item>
                <Box sx={{ display: 'flex', gap: 3 }} className="nav-links">
                  {drawerItems.map((text) => (
                    <li key={text} style={{ listStyle: 'none' }}>
                      <NavLink to={`/${text.toLowerCase()}`} className="nav-link">
                        <span>{text}</span>
                      </NavLink>
                    </li>
                  ))}
                </Box>
              </Grid>
            </Grid>
          )}

          {isLoggedIn ? (
            <IconButton edge="end" color="inherit" aria-label="user account" onClick={handleMenu}>
              <AccountCircleIcon />
            </IconButton>
          ) : (
            <Button
              variant="contained"
              sx={{
                height: '5.5vh',
                backgroundColor: '#333',
                color: '#fff',
                borderColor: '#fff',
                padding: '6px 16px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#555',
                  borderColor: '#fff',
                },
              }}
            >
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Small Screens */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          {drawerItems.map((text) => (
            <ListItem button key={text} onClick={toggleDrawer}>
              <ListItemText>
                <NavLink to={`/${text.toLowerCase()}`} className="nav-link" style={{ color: 'inherit' }}>
                  {text}
                </NavLink>
              </ListItemText>
            </ListItem>
          ))}
          <ListItem button>
            {isLoggedIn ? (
              <>
                <ListItemText primary="Profile" component={Link} to="/profile" onClick={toggleDrawer} />
                <ListItemText primary="Show Tickets" component={Link} to="/tickets" onClick={toggleDrawer} />
                <ListItemText primary="Logout" onClick={handleLogout} />
              </>
            ) : (
              <Button
                variant="contained"
                sx={{
                  width: '100%',
                  backgroundColor: '#333',
                  color: '#fff',
                  borderColor: '#fff',
                  padding: '10px 0',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#555',
                    borderColor: '#fff',
                  },
                }}
                component={Link}
                to="/login"
                onClick={toggleDrawer}
              >
                Login
              </Button>
            )}
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;
