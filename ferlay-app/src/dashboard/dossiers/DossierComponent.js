import { Box, Grid } from '@mui/material'
import React from 'react'
import { CardDossier } from '../../components/CardDossier'
import { TitleTypography } from '../../components/commonComponents'
import { dataDossiers } from '../accueil/AccueilComponent'
import { withListeHoc } from '../../components/HOCs/withListeHoc'
import { getAllDossier } from '../../dataFetching/dataReading'
import { useOutletContext } from 'react-router-dom'

export const DossierList = ({data, openRightDrawer, setOpenRightDrawer}) => {
  return (
    <>
      {
        data.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Box onClick={() => setOpenRightDrawer({statue: true, element: 'dossier',id: item.id })}>
                <CardDossier {...item} />
              </Box>
            </Grid>
          ))
        }
    </>
  )
}



const DossierListComponent = withListeHoc(DossierList, async({data}) => {
  const result = await getAllDossier();
  
  const finalData = result.map((item) => ({
    name: `${item.nom} ${item.postnom} ${item.prenom}(${item.etudiant})`,
    isLocked: item.is_locked ? 'locked': 'unlocked',
    id: item.id
  }))
  return finalData;
})


export const DossierComponent = () => {
  const [openRightDrawer, setOpenRightDrawer] = useOutletContext();
  return (
    <>
      <TitleTypography>Dossiers</TitleTypography>
      <Grid container spacing={2} mb={2}>
        <DossierListComponent openRightDrawer={openRightDrawer} setOpenRightDrawer={setOpenRightDrawer} />
      </Grid>
    </>
  )
}

