import { Box, Card, CardContent, CardHeader, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllDemande } from '../../dataFetching/dataReading';

export const DemandeComponent = () => {
  const [demandes, setDemandes] = useState([]);

  console.log(demandes)

  const loadingDemande = async () => {
    const data = await getAllDemande();
    if (data) {
      setDemandes(data);
    }
  }

  useEffect(() => {
    return () => {
      loadingDemande();
    }
  }, [])

  return (
    <Stack
      spacing={2}
    >
      {
        demandes.map((item) => (
          <Card key={item.id}>
            <CardHeader subheader={`${item.Dossier.nom} ${item.Dossier.prenom} (${item.Dossier.etudiant})`} />
            <CardContent>
            {item.content}
            </CardContent>
          </Card>
        ))
      }
    </Stack>
  )
}
