import { Box, Grid } from '@mui/material'
import React from 'react'
import { CardDocument } from '../../components/CardDocument'
import { TitleTypography } from '../../components/commonComponents'
import { withListeHoc } from '../../components/HOCs/withListeHoc'
import { getAllDocument } from '../../dataFetching/dataReading'
import { useOutletContext } from 'react-router-dom'

export const DocumentList = ({data, openRightDrawer, setOpenRightDrawer}) => {
  return (
    <>
      {
        data.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Box onClick={() => setOpenRightDrawer(true)}>
              <CardDocument {...item} />
            </Box>
          </Grid>
        ))
      }
    </>
  )
}

const DocumentListComponent = withListeHoc(DocumentList, async({data}) => {
  const result = await getAllDocument();
  console.log(result)
  const finalData = result.map((item) => ({
    title: item.nom_document,
    type: item.extension ? item.extension : 'text',
    user: {
      name: item.Dossier.etudiant
    }
  }))
  return finalData;
})

export const DocumentComponent = () => {
  const [openRightDrawer, setOpenRightDrawer] = useOutletContext();
  return (
    <>
      <TitleTypography>Documents</TitleTypography>
      <Grid container spacing={2} mb={2}>
        <DocumentListComponent openRightDrawer={openRightDrawer} setOpenRightDrawer={setOpenRightDrawer} />
      </Grid>
    </>
  )
}
