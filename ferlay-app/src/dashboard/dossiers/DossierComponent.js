import { Box, Grid, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CardDossier } from '../../components/CardDossier'
import { TitleTypography } from '../../components/commonComponents'
import { dataDossiers } from '../accueil/AccueilComponent'
import { withListeHoc } from '../../components/HOCs/withListeHoc'
import { getAllDossier, getDossierByName } from '../../dataFetching/dataReading'
import { useOutletContext } from 'react-router-dom'
import { SearchBar } from '../../utilisateur/searchbar/SearchBar'

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



const DossierListComponent = withListeHoc(DossierList, async({data, search}) => {
  const result = await getDossierByName(search);
  alert("passé")
  const finalData = result.map((item) => ({
    name: `${item.nom} ${item.postnom} ${item.prenom}(${item.etudiant})`,
    isLocked: item.is_locked ? 'locked': 'unlocked',
    id: item.id
  }))
  return finalData;
})


export const DossierComponent = () => {
  const [openRightDrawer, setOpenRightDrawer] = useOutletContext();
  const [search, setSearch] = useState('');
  const [handleSearch, setHandleSearch] = useState(false);

  useEffect(() => {
    setHandleSearch(false);
    return () => {
      setHandleSearch(true);
    }
  }, [search])
  return (
    <>
      <Stack 
        direction={'row'}
        justifyContent={'space-between'}
      >
        <TitleTypography>Dossiers</TitleTypography>
        <SearchBar search={search} setSearch={setSearch} />
      </Stack>
      <Grid container spacing={2} mb={2}>
        {
          handleSearch ?
          (
            <></>
          ):
          (
            <DossierListComponent search={search} openRightDrawer={openRightDrawer} setOpenRightDrawer={setOpenRightDrawer} />
          )
        }
      </Grid>
    </>
  )
}

