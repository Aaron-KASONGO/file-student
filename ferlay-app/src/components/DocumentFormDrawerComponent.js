import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, IconButton, Modal, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { getDocumentById } from '../dataFetching/dataReading';
import { UpdateDocumentById } from '../dataFetching/dataUpdating';
import { deleteDocumentById } from '../dataFetching/dataDeleting';
import { PriorityHigh } from '@mui/icons-material';
import { supabase } from '../config/supabaseClient';

export const DocumentFormDrawerComponent = ({id, openRightDrawer, setOpenRightDrawer}) => {
    const [nomDocument, setNomDocument] = useState(null);
    const [disabledModif, setDisabledModif] = useState(true);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [loadingSup, setLoadingSup] = useState(false);
    const [docRef, setDocRef] = useState(null);

    const fetchDocument = async() => {
        const data = await getDocumentById(id);
        if (data) {
            setNomDocument(data.nom_document)
            setDocRef(
                supabase
                    .storage
                    .from('documents')
                    .getPublicUrl(data.doc_ref, {
                    download: true,
                    }).data.publicUrl
            )
        }
    }

    const handleChange = (e) => {
        setNomDocument(e.target.value);
        setDisabledModif(false);
    }

    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
    }

    const updateDocument = async () => {
        const data = await UpdateDocumentById(nomDocument, id);
        if (data) {
            setOpenRightDrawer({statue: false, element: null, id: null});
        }
    }

    const deleteDocument = async () => {
        setLoadingSup(true);
        const data = await deleteDocumentById(id)

        if (data) {
            setLoadingSup(false);
            handleCloseDeleteModal();
            setOpenRightDrawer(false)
        }
    }

    useEffect(() => {
        fetchDocument();
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
                    <Button color='error' onClick={() => setOpenRightDrawer({statue: false, element: null, id: null})}>Annuler</Button>
                </Stack>
                <Stack
                    direction={'row'}
                    spacing={3}
                >
                    <IconButton onClick={() => setDeleteModalOpen(true)} color='error'>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton href={docRef} color='primary'>
                        <CloudDownloadIcon />
                    </IconButton>
                </Stack>
            </Stack>
        </Box>
        <Modal
            open={deleteModalOpen}
            onClose={handleCloseDeleteModal}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
      >
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                pt: 2,
                px: 4,
                pb: 3,
            }}
        >
            <Card>
                <CardHeader
                    title={'Suppression'}
                    avatar={<Avatar sx={{ bgcolor: 'error.main' }}><PriorityHigh /></Avatar>}
                />
                <CardContent>
                    Voulez-vous supprimer le document {nomDocument} ?
                </CardContent>
                <CardActions>
                    <Button disabled={loadingSup} onClick={deleteDocument} color='error'>Supprimer</Button>
                    <Button onClick={handleCloseDeleteModal}>Annuler</Button>
                </CardActions>
            </Card>
        </Box>
      </Modal>
    </Box>
  )
}
