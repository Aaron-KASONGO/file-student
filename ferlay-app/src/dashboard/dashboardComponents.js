import React from 'react'
import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import MuiDrawer from '@mui/material/Drawer';

import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import FolderIcon from '@mui/icons-material/Folder';
import SchoolIcon from '@mui/icons-material/School';
import SdCardAlertIcon from '@mui/icons-material/SdCardAlert';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Box, CircularProgress, Typography, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const drawerWidth = 240;

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
);

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});
  
const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

export const DrawerSide = ({open, handleDrawerClose}) => {
    const theme = useTheme();
    
  return (
    <>
        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
            </DrawerHeader>
            {
                open && (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            my: 3
                        }}
                        >
                        {
                            true ? (
                                <>
                                <Avatar sx={{
                                    width: 75,
                                    height: 75
                                }} src={'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} alt='avatar' />
                                <Box>
                                    <Typography variant='h6' textAlign='center'>Bismark Biyombo</Typography>
                                    <Typography variant='subtitle2' textAlign='center'>bismark.biyombo@gmail.com</Typography>
                                </Box>
                                </>
                            ): (
                            <CircularProgress />
                            )
                        }
                    </Box>
                )
            }
            <Divider />
            <List>
            {drawerIcons.map((item, index) => (
                <NavLink
                    to={item.url}
                    style={{
                        textDecoration: 'none',
                        color: 'inherit'
                    }}
                >
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                            }}
                        >
                            <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                            >
                            {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                </NavLink>
            ))}
            </List>
            <Divider />
            <List>
            {drawerIconsDivider.map((item, index) => (
                <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                    sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    }}
                >
                    <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                    >
                    {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
                </ListItem>
            ))}
            </List>
        </Drawer>
    </>
  )
}

const drawerIcons = [
    {
        title: "Accueil",
        icon: <HomeIcon />,
        url: '/'
    },
    {
        title: "Documents",
        icon: <ArticleIcon />,
        url: '/documents'
    },
    {
        title: "Dossiers",
        icon: <FolderIcon />,
        url: '/dossiers'
    },
    {
        title: "Étudiants",
        icon: <SchoolIcon />,
        url: '/etudiants'
    },
    {
        title: "Demandes",
        icon: <SdCardAlertIcon />,
        url: '/demandes'
    },
    {
        title: "Historique",
        icon: <HistoryIcon />,
        url: '/historique'
    }
]

const drawerIconsDivider = [
    {
        title: "Déconnexion",
        icon: <LogoutIcon />
    }
]