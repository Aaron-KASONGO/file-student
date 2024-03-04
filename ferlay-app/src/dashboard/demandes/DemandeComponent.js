import { Box, Button, Card, CardContent, CardHeader, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllDemande } from '../../dataFetching/dataReading';
import { UpdateDemandeById } from '../../dataFetching/dataUpdating';

export const DemandeComponent = () => {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(demandes)

  const loadingDemande = async () => {
    const data = await getAllDemande();
    if (data) {
      setDemandes(data);
    }
  }

  const handleUpdateDemande = async (id, viewed) => {
    setLoading(true);
    const data = await UpdateDemandeById(id, viewed);
    if (data) {
      setLoading(false)
    }
  }

  useEffect(() => {
    return () => {
      loadingDemande();
    }
  }, [loading])

  return (
    <Stack
      spacing={2}
    >
      {
        demandes.map((item) => (
          <Card key={item.id}>
            <CardHeader subheader={`${item.Dossier.nom} ${item.Dossier.prenom} (${item.Dossier.etudiant})`} />
            <CardContent>
              <Stack
                direction={'row'}
                justifyContent={'space-between'}
              >
                <Typography>
                {item.content}
                </Typography>
                {
                  item.viewed ? <Button onClick={() => handleUpdateDemande(item.id, false)} variant='contained' size='small' color='error'>Invalider</Button>: <Button onClick={() => handleUpdateDemande(item.id, true)} variant='contained' size='small' color='success'>Valider</Button>
                }
                </Stack>
            </CardContent>
          </Card>
        ))
      }
    </Stack>
  )
}
