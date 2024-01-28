import { Grid } from '@mui/material'
import React from 'react'
import { CardEtudiant } from '../../components/CardEtudiant'
import { TitleTypography } from '../../components/commonComponents'

const dataUser = [
  {
    user: {
      name: "Ivone KATOMPA"
    }
  },
  {
    user: {
      name: "Ives MASHIMANGO"
    }
  }
]

export const EtudiantComponent = () => {
  return (
    <>
      <TitleTypography>Etudiants</TitleTypography>
      <Grid container spacing={2} mb={2}>
        {
          dataUser.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <CardEtudiant {...item} />
            </Grid>
          ))
        }
      </Grid>
    </>
  )
}
