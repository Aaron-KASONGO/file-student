import { AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { supabase } from '../../config/supabaseClient';
import { DocumentScanner } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';


export const Navbar = ({dossier, setOpenModal}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOut = () => {
        supabase.auth.signOut();
        navigate('/');
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
            <DocumentScanner />
          </IconButton>
          <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
            Document ESIS
          </Typography>
          <IconButton
            onClick={handleClick}
          >
            <Stack
              direction={'row'}
              spacing={1}
            >
              <Avatar alt='utilisateur' />
              <Stack
                alignItems={'start'}
              >
                <Typography variant='body2' color={'white'} fontWeight={'bold'}>{dossier.nom} {dossier.postnom} {dossier.prenom}</Typography>
                <Typography variant='caption' color={'white'}>Étudiant</Typography>
              </Stack>
            </Stack>
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
                <MenuItem><Link to={'/demandes'} style={{ textDecoration: 'none'}} reloadDocument><Typography color={'black'}>Mes demandes</Typography></Link></MenuItem>
                <MenuItem onClick={logOut}>Se déconnecter</MenuItem>
            </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
