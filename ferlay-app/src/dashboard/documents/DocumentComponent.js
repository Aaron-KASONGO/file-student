import { Box, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
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
            <Box onClick={() => setOpenRightDrawer({statue: true, element: 'document',id: item.id })}>
              <CardDocument {...item} />
            </Box>
          </Grid>
        ))
      }
    </>
  )
}



export const DocumentComponent = () => {
  const [openRightDrawer, setOpenRightDrawer] = useOutletContext();
  const [component, setComponent] = useState({
    component: null
  });

  const loadDocumentListComponent = () => {
    const DocumentListComponent = withListeHoc(DocumentList, async({data}) => {
      const result = await getAllDocument();
      const finalData = result.map((item) => ({
        title: item.nom_document,
        type: item.extension ? item.extension : 'text',
        user: {
          name: item.Dossier.etudiant
        },
        id: item.id
      }))
      return finalData;
    })

    setComponent({
      component: <DocumentListComponent openRightDrawer={openRightDrawer} setOpenRightDrawer={setOpenRightDrawer} />
    })
  }

  useEffect(() => {
    loadDocumentListComponent();
  }, [openRightDrawer]);
  return (
    <>
      <TitleTypography>Documents</TitleTypography>
      <Grid container spacing={2} mb={2}>
        {
          component?.component
        }
      </Grid>
    </>
  )
}
