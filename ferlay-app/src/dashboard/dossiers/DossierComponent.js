import { Grid } from '@mui/material'
import React from 'react'
import { CardDossier } from '../../components/CardDossier'
import { TitleTypography } from '../../components/commonComponents'
import { dataDossiers } from '../accueil/AccueilComponent'
import { withListeHoc } from '../../components/HOCs/withListeHoc'
import { getAllDossier } from '../../dataFetching/dataReading'

export const DossierList = ({data}) => {
  return (
    <>
      {
        data.map((item) => (
            <Grid item xs={12} key={item.id}>
              <CardDossier {...item} />
            </Grid>
          ))
        }
    </>
  )
}



const DossierListComponent = withListeHoc(DossierList, async({data}) => {
  const result = await getAllDossier();
  
  const finalData = result.map((item) => ({
    name: `${item.nom} ${item.postnom} ${item.prenom}`,
    isLocked: item.is_locked ? 'locked': 'unlocked'
  }))
  return finalData;
})


export const DossierComponent = () => {
  return (
    <>
      <TitleTypography>Dossiers</TitleTypography>
      <Grid container spacing={2} mb={2}>
        <DossierListComponent />
      </Grid>
    </>
  )
}

