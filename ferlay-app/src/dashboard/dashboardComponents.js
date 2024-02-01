import React, { useEffect, useState } from 'react'
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
import { Autocomplete, Avatar, Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, Stack, TextField, Typography, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { getAllDossier } from '../dataFetching/dataReading';

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
    const [openAddUser, setOpenAddUser] = useState(false);
    const [openAddDoc, setOpenAddDoc] = useState(false);

    const handleCloseAddUser = () => {
        setOpenAddUser(false);
    }

    const handleOpenAddUser = () => {
        setOpenAddUser(true);
    }

    const handleCloseAddDoc = () => {
        setOpenAddDoc(false);
    }

    const handleOpenAddDoc = () => {
        setOpenAddDoc(true)
    }
    
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
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    pb: 5
                }}
            >
                <Box>
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
                </Box>
                {
                    open && (
                        <Stack
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            direction='column'
                            spacing={2}
                        >
                            <Button variant='contained' sx={{ borderRadius: 5 }} onClick={handleOpenAddUser}>Ajouter un étudiant</Button>
                            <Button variant='contained' sx={{ borderRadius: 5 }} onClick={handleOpenAddDoc}>Créer un document</Button>
                        </Stack>
                    )
                }
            </Box>
            <AddStudentDialog open={openAddUser} handleClose={handleCloseAddUser} />
            {
                openAddDoc && (
                    <AddDocumentDialog open={openAddDoc} handleClose={handleCloseAddDoc} />
                )
            }
        </Drawer>
    </>
  )
}

const AddDocumentDialog = ({open, handleClose}) => {
    const [dossiers, setDossiers] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target

        handleClose();
    }

    const loadDossier = async () => {
        const data = await getAllDossier();

        const options = data.map(({prenom, nom, etudiant, id}) => ({label: `${prenom} ${nom} ${etudiant}`, id: id}))
        setDossiers(options)
    }

    useEffect(() => {
        // alert("show")
        return () => {
            loadDossier();
        };
    }, []);
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                component="form"
                onSubmit={handleSubmit}
            >
                <DialogTitle>Ajouter Étudiant</DialogTitle>
                <DialogContent>
                    <Stack
                        spacing={2}
                    >
                        <TextField
                            required
                            name="nom_document"
                            label="Nom du document"
                            type="text"
                            fullWidth
                        />
                        {/* <TextField
                            required
                            name="dossier"
                            label="Nom du dossier"
                            type="text"
                            fullWidth
                        /> */}
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={dossiers}
                            renderInput={(params) => <TextField {...params} label="Dossier" fullWidth />}
                        />
                        <TextField
                            required
                            name="postnom"
                            label="Post-Nom"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            required
                            name="extension"
                            label="Extension du document"
                            type="email"
                            fullWidth
                        />
                        <Stack
                            direction='row'
                            spacing={1}
                        >
                            <Button type='submit' variant='contained'>Créer</Button>
                            <Button type='reset' onClick={() => handleClose()}  variant='contained' color='secondary'>Annuler</Button>
                        </Stack>
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    )
}

const AddStudentDialog = ({open, handleClose}) => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target
        const { error } = await supabase.auth.signUp({
            email: form.email.value,
            password: form.password.value,
            options: {
                data: {
                    role: 'student'
                }
            }
        })

        if (error) {
            alert(error.message)
        } else {
            alert('Check your email for confirmation')

            const { data, error } = await supabase
            .from('Dossier')
            .insert([
            { etudiant: form.email.value, prenom: form.prenom.value, nom: form.nom.value, postnom: form.postnom.value },
            ])
            .select()
            }
        // alert(form.email.value + " " + form.password.value)
        handleClose();
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                component="form"
                onSubmit={handleSubmit}
            >
                <DialogTitle>Ajouter Étudiant</DialogTitle>
                <DialogContent>
                    <Stack
                        spacing={2}
                    >
                        <TextField
                            required
                            name="prenom"
                            label="Prénom"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            required
                            name="nom"
                            label="Nom"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            required
                            name="postnom"
                            label="Post-Nom"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            required
                            name="email"
                            label="Adresse mail"
                            type="email"
                            fullWidth
                        />
                        <TextField
                            required
                            name="password"
                            label="Mot de passe"
                            type="password"
                            fullWidth
                        />
                        <Stack
                            direction='row'
                            spacing={1}
                        >
                            <Button type='submit' variant='contained'>Ajouter</Button>
                            <Button type='reset' onClick={() => handleClose()}  variant='contained' color='secondary'>Annuler</Button>
                        </Stack>
                    </Stack>
                </DialogContent>
            </Dialog>
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