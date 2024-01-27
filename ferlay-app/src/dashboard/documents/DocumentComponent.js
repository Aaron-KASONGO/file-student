import { Grid } from '@mui/material'
import React from 'react'
import { CardDocument } from '../../components/CardDocument'
import { TitleTypography } from '../../components/commonComponents'
import { dataRecentDocuments } from '../accueil/AccueilComponent'

export const DocumentComponent = () => {
  return (
    <>
      <TitleTypography>Documents</TitleTypography>
      <Grid container spacing={2} mb={2}>
        {
          dataRecentDocuments.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <CardDocument {...item} />
            </Grid>
          ))
        }
      </Grid>
    </>
  )
}
