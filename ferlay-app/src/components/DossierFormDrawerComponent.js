import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { getDossierById } from '../dataFetching/dataReading';
import { UpdateDossiertById } from '../dataFetching/dataUpdating';
import { Link } from 'react-router-dom';

export const DossierFormDrawerComponent = ({ id, openRightDrawer, setOpenRightDrawer }) => {
  const [disabledModif, setDisabledModif] = useState(true);
  const [controlledForm, setControlledForm] = useState({
    email: "",
    nom: "",
    postnom: "",
    prenom: ""
  });

  // handle function for controlled input
  const handleNom = (e) => {
    setControlledForm({...controlledForm, nom: e.target.value});
    setDisabledModif(false);
  }

  const handleEmail = (e) => {
    setControlledForm({...controlledForm, email: e.target.value});
    setDisabledModif(false);
  }

  const handlePostnom = (e) => {
    setControlledForm({...controlledForm, postnom: e.target.value});
    setDisabledModif(false);
  }

  const handlePrenom = (e) => {
    setControlledForm({...controlledForm, prenom: e.target.value});
    setDisabledModif(false);
  }

  // Loading data to input elements
  const loadingDataInput = async () => {
    const data = await getDossierById(id);
    if (data) {
        setControlledForm({
          email: data.etudiant,
          nom: data.nom,
          prenom: data.prenom,
          postnom: data.postnom
        })
        console.log(data)
    }
  }

  // Update a dossier
  const updateDossier = async () => {
    const data = await UpdateDossiertById(controlledForm.email,controlledForm.nom, controlledForm.postnom, controlledForm.prenom, id);
    if (data) {
        setOpenRightDrawer(false);
    }
  }

  // UseEffect to run while mount and unmount component
  useEffect(() => {
    return () => {
      loadingDataInput()
    };
  }, []);

  return (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            my: 4,
        }}
    >
        <Box>
            <ArticleIcon sx={{ fontSize: 50 }} color='primary'/>
        </Box>
        <Box>
            <Typography variant='h5' textAlign={'center'}>Détail dossier</Typography>
            <Stack
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    my: 3
                }}
                spacing={2}
            >
                <TextField value={controlledForm.email} onChange={handleEmail} focused id="outlined-basic" label="Email" variant="outlined" />
                <TextField value={controlledForm.nom} onChange={handleNom} focused id="outlined-basic" label="Nom" variant="outlined" />
                <TextField value={controlledForm.postnom} onChange={handlePostnom} focused id="outlined-basic" label="Post-nom" variant="outlined" />
                <TextField value={controlledForm.prenom} onChange={handlePrenom} focused id="outlined-basic" label="Prénom" variant="outlined" />
                <Stack
                    direction={'row'}
                    spacing={3}
                >
                    <Button disabled={disabledModif} onClick={updateDossier}>Modifier</Button>
                    <Button color='error' onClick={() => setOpenRightDrawer({...openRightDrawer, statue: false})}>Annuler</Button>
                </Stack>
                <Link to={`/dossiers/${id}`} style={{ textDecoration: 'none'}}>
                  <Button>
                    Ouvrir le dossier
                  </Button>
                </Link>
                {/* <Stack
                    direction={'row'}
                    spacing={3}
                >
                    <IconButton color='error'>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton color='primary'>
                        <CloudDownloadIcon />
                    </IconButton>
                </Stack> */}
            </Stack>
        </Box>
    </Box>
  )
}
