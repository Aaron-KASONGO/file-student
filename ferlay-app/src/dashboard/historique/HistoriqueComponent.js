import { Card, CardContent, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { supabase } from '../../config/supabaseClient';
import { getAllDemandeInvalid, getAllDossier } from '../../dataFetching/dataReading';

export const HistoriqueComponent = () => {
  const [data, setData] = useState({
    dossierCree: null,
    nbDossier: null,
    nbDemandes: null,
    nbIncomplets: null
  });

  const getDossierCree = async() => {
    let {data, error} = await supabase.rpc('nb_dossiers_crees_aujourdhui')
    if (data) {
      setData(current => ({
        ...current, dossierCree: data[0].nb_dossiers
      }))
    }
  }
  const getNbDossier = async () => {
    const data = await getAllDossier();
    if (data) {
      console.log(data)
      setData(current => ({
        ...current, nbDossier: data.length
      }))
    }
  }
  const getNbDemande = async () => {
    const data = await getAllDemandeInvalid();
    if (data) {
      console.log(data)
      setData(current => ({
        ...current, nbDemandes: data.length
      }))
    }
  }

  const getNbIncomplets = async () => {
    let {data, error} = await supabase.rpc('nombre_dossiers_complet')
    if (data) {
      console.log(data)
      setData(current => ({
        ...current, nbIncomplets: data.length
      }))
    }
  }

  useEffect(() => {
    getDossierCree();
    getNbIncomplets();
    getNbDossier();
    getNbDemande();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant='h5'>Documents crées aujourd'hui</Typography>
            <Typography variant='h1' my={5} textAlign={'center'}>{data.dossierCree}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant='h5'>Nombre de dossiers</Typography>
            <Typography variant='h1' my={5} textAlign={'center'}>{data.nbDossier}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant='h5'>Nombre de demandes en attentes</Typography>
            <Typography variant='h1' my={5} textAlign={'center'}>{data.nbDemandes}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant='h5'>Nombre de dossiers incomplets</Typography>
            <Typography variant='h1' my={5} textAlign={'center'}>{data.nbIncomplets}</Typography>
          </CardContent>
        </Card>
      </Grid> 
    </Grid>
  )
}
