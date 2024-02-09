import { Grid } from '@mui/material'
import React from 'react'
import { CardDocumentUser } from '../../components/CardDocumentUser'

export const DocumentLisUser = ({data}) => {
  return (
    <>
        {
            data.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <CardDocumentUser {...item} />
            </Grid>
            ))
        }
    </>
  )
}
