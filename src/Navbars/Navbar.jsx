import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, Box, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

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
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerItems = ['Home', 'About', 'Services', 'Contact'];

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#111', padding: '0 20px', top: 0, left: 0, right: 0, zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Brand Name */}
          <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
            Yatramitra
          </Typography>

          {/* Navigation Links and Menu Icon */}
          {isSmallScreen ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
            </Box>
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
        </Toolbar>
      </AppBar>

      {/* Drawer for Small Screens */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
      >
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
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;
