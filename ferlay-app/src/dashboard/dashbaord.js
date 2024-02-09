import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet } from 'react-router-dom';
import { DrawerHeader, DrawerSide, drawerWidth } from './dashboardComponents';
import { Drawer } from '@mui/material';
import { DocumentFormDrawerComponent } from '../components/DocumentFormDrawerComponent';
import { DossierFormDrawerComponent } from '../components/DossierFormDrawerComponent';
import { supabase } from '../supabaseClient';



const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
// objet = { statue: false, element: dossier || document, id }

export default function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const [session, setSession] = React.useState(null)

  const [openRightDrawer, setOpenRightDrawer] = React.useState({statue: false, element: null, id: null});
  console.log(openRightDrawer)
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: 2 }} open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Gestionaire de documents
          </Typography>
        </Toolbar>
      </AppBar>
      <DrawerSide session={session} open={open} handleDrawerClose={handleDrawerClose} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet context={[openRightDrawer, setOpenRightDrawer]} />
      </Box>
      <Drawer
            anchor={'right'}
            open={openRightDrawer.statue}
            onClose={() => setOpenRightDrawer({...openRightDrawer, statue: false})}
          >
            <Box width={300}>
              {
                openRightDrawer.element === 'document' ? (
                  <DocumentFormDrawerComponent id={openRightDrawer.id} openRightDrawer={openRightDrawer} setOpenRightDrawer={setOpenRightDrawer} />
                ): (
                  <DossierFormDrawerComponent id={openRightDrawer.id} openRightDrawer={openRightDrawer} setOpenRightDrawer={setOpenRightDrawer} />
                )
              }
            </Box>
      </Drawer>
    </Box>
  );
}