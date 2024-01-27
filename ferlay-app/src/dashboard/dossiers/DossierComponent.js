import { Grid } from '@mui/material'
import React from 'react'
import { CardDossier } from '../../components/CardDossier'
import { TitleTypography } from '../../components/commonComponents'
import { dataDossiers } from '../accueil/AccueilComponent'

export const DossierComponent = () => {
  return (
    <>
      <TitleTypography>Dossiers</TitleTypography>
      <Grid container spacing={2} mb={2}>
        {
          dataDossiers.map((item) => (
            <Grid item xs={12} key={item.id}>
              <CardDossier {...item} />
            </Grid>
          ))
        }
      </Grid>
    </>
  )
}
