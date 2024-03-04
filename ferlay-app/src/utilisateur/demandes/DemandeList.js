import { Button, Card, CardActions, CardContent, CardHeader, Container, Modal, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Navbar } from '../navbar/Navbar'
import { useOutletContext } from 'react-router-dom';
import { getDemandeByDossier } from '../../dataFetching/dataReading';

export const DemandeList = () => {
    const [demandes, setDemandes] = useState([]);
    const {openModal, setOpenModal, onSubmitDemand, dossier} = useOutletContext();

    const loadDemandes = async () => {
        const data = await getDemandeByDossier(dossier.id);
        if (data) {
            console.log(demandes)
            setDemandes(demandes);
        }
    }

    useEffect(() => {
        loadDemandes();
    }, [dossier]);
  return (
    <Stack>
        <Container>
            <Stack
                spacing={2}
            >
                {
                    demandes.map((item) => (
                        <Card key={item.id}>
                          <CardHeader subheader={`Non validé`} />
                          <CardContent>
                          {item.content}
                          </CardContent>
                        </Card>
                      ))
                }
                {
                    demandes.length === 0 && (
                        <Typography textAlign={'center'} variant='h4'>Rien à afficher !</Typography>
                    )
                }
            </Stack>
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
                            name='demande'
                        />
                </CardContent>
                <CardActions>
                    <Button type='submit' variant='contained'>Envoyer</Button>
                    <Button onClick={() => setOpenModal(false)} type='reset' variant='contained' color='error'>Annuler</Button>
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
