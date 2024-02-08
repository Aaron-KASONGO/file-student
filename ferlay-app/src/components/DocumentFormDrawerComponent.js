import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { getDocumentById } from '../dataFetching/dataReading';
import { UpdateDocumentById } from '../dataFetching/dataUpdating';

export const DocumentFormDrawerComponent = ({id, openRightDrawer, setOpenRightDrawer}) => {
    const [nomDocument, setNomDocument] = useState(null);
    const [disabledModif, setDisabledModif] = useState(true);

    const fetchDocument = async() => {
        const data = await getDocumentById(id);
        if (data) {
            setNomDocument(data.nom_document)
        }
    }

    const handleChange = (e) => {
        setNomDocument(e.target.value);
        setDisabledModif(false);
    }

    const updateDocument = async () => {
        const data = await UpdateDocumentById(nomDocument, id);
        if (data) {
            setOpenRightDrawer(false);
        }
    }

    useEffect(() => {
        return () => {
            fetchDocument();
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
            <Typography variant='h5' textAlign={'center'}>Détail document</Typography>
            <Stack
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    my: 3
                }}
                spacing={2}
            >
                <TextField focused value={nomDocument} onChange={(e) => handleChange(e)} id="outlined-basic" label="Nom document" variant="outlined" />
                <Stack
                    direction={'row'}
                    spacing={3}
                >
                    <Button disabled={disabledModif} onClick={() => updateDocument()}>Modifier</Button>
                    <Button color='error' onClick={() => setOpenRightDrawer({...openRightDrawer, statue: false})}>Annuler</Button>
                </Stack>
                <Stack
                    direction={'row'}
                    spacing={3}
                >
                    <IconButton color='error'>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton color='primary'>
                        <CloudDownloadIcon />
                    </IconButton>
                </Stack>
            </Stack>
        </Box>
    </Box>
  )
}
