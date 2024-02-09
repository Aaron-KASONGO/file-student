import React, { useEffect, useState } from 'react'
import { Navbar } from './navbar/Navbar'
import { supabase } from '../supabaseClient'
import { getDocumentByDossier, getDossierByEmail } from '../dataFetching/dataReading'
import { Box, Button, Card, CardActions, CardContent, CardHeader, Container, Grid, Modal, Stack, TextField, Typography } from '@mui/material'
import { SearchBar } from './searchbar/SearchBar'
import { DocumentLisUser } from './documentlist/DocumentLisUser'
import { withListeNotAsyncHoc } from '../components/HOCs/withListeNotAsyncHoc'

const DocumentUser = withListeNotAsyncHoc(DocumentLisUser, ({data, search}) => {
    // console.log(search)
    const result = data.filter((item) => item.title.includes(search));
    return result;
  })

export const Utilisateur = () => {
    const [session, setSession] = useState(null)
    const [dossier, setDossier] = useState({});
    const [documents, setDocuments] = useState([]);
    const [search, setSearch] = useState("");
    const [openModal, setOpenModal] = useState(false);

    const onSubmitDemand = (e) => {
        e.preventDefault();
        const form = e.target

    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            getDossierByEmail(session.user.email)
                .then((result) => {
                    setDossier(result);
                    getDocumentByDossier(result.id)
                        .then((response) => {
                            const finalData = response.map((item) => ({
                                title: item.nom_document,
                                type: item.extension ? item.extension : 'text',
                                user: {
                                    name: item.Dossier.etudiant
                                },
                                id: item.id,
                                doc_ref: item.doc_ref
                                }))
                            setDocuments(finalData);
                        })
                });
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])
    return (
        <Stack spacing={4}>
            <Navbar dossier={dossier} setOpenModal={setOpenModal} />
            <Box
                display={'flex'}
                justifyContent={'center'}
            >
                <SearchBar search={search} setSearch={setSearch} />
            </Box>
            <Container>
                <Grid container spacing={2}>
                    <DocumentUser data={documents} search={search} />
                </Grid>
            </Container>
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card sx={style} component={'form'} onSubmit={onSubmitDemand}>
                    <CardHeader title='Faire une demande' />
                    <CardContent>
                            <TextField
                                id="outlined-multiline-static"
                                label="Demande"
                                multiline
                                rows={4}
                                placeholder='Contenu de la demande'
                                fullWidth
                            />
                    </CardContent>
                    <CardActions>
                        <Button type='submit' variant='contained'>Envoyer</Button>
                        <Button type='reset' variant='contained' color='error'>Annuler</Button>
                    </CardActions>
                </Card>
            </Modal>
        </Stack>
  )
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    p: 4,
  };
  
