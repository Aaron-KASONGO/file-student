import { Grid } from '@mui/material'
import React from 'react'
import { CardDocument } from '../../components/CardDocument'
import { CardDossier } from '../../components/CardDossier'
import { NormalTypography, SubtitleTypography, TextTypography, TitleTypography } from '../../components/commonComponents'

const dataRecentDocuments = [
  {
    id: 1,
    title: "Mon titre 1",
    type: 'text',
    user: {name: "Mon nom", avatar: "Mon avatar"}
  },
  {
    id: 2,
    title: "Mon titre 2",
    type: 'sheet',
    user: {name: "Mon nom", avatar: "Mon avatar"}
  },
  {
    id: 3,
    title: "Mon titre 3",
    type: 'text',
    user: {name: "Mon nom", avatar: "Mon avatar"}
  },
  {
    id: 4,
    title: "Mon titre 4",
    type: 'pdf',
    user: {name: "Mon nom", avatar: "Mon avatar"}
  }
]

const dataDossiers = [
  {
    id: 1,
    name: "KASONGO NYEMBO Mercier",
    isLocked: "locked"
  },
  {
    id: 2,
    name: "KAWEJ A MBAY Excellence",
    isLocked: "unlocked"
  },
  {
    id: 3,
    name: "KATAMBALA MUZUNGU Urbain",
    isLocked: "unlocked"
  }
]

export const AccueilComponent = () => {
  return (
    <div>
      <TitleTypography>Accueil</TitleTypography>
      <SubtitleTypography>Documents recents</SubtitleTypography>
      <Grid container spacing={2} mb={2}>
        {
          dataRecentDocuments.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <CardDocument {...item} />
            </Grid>
          ))
        }
      </Grid>
      <SubtitleTypography>Dossiers</SubtitleTypography>
      <Grid container spacing={2} mb={2}>
        {
          dataDossiers.map((item) => (
            <Grid item xs={12} key={item.id}>
              <CardDossier {...item} />
            </Grid>
          ))
        }
      </Grid>
    </div>
  )
}
