import { AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { supabase } from '../../supabaseClient';

export const Navbar = ({dossier, setOpenModal}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOut = () => {
        supabase.auth.signOut();
    }

    return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <IconButton
            onClick={handleClick}
          >
            <Avatar src='https://images.pexels.com/photos/5774802/pexels-photo-5774802.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' />
          </IconButton>
          <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem><Typography variant='body1' fontWeight={'bold'}>{dossier.nom} {dossier.postnom} {dossier.prenom}</Typography></MenuItem>
                <MenuItem onClick={() => setOpenModal(true)}>Faire une demande</MenuItem>
                <MenuItem onClick={logOut}>Logout</MenuItem>
            </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
