import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { CardDocument } from '../../components/CardDocument'
import { CardDossier } from '../../components/CardDossier'
import { NormalTypography, SubtitleTypography, TextTypography, TitleTypography } from '../../components/commonComponents'
import { DossierList } from '../dossiers/DossierComponent'
import { getRecentDocument, getRecentDossier } from '../../dataFetching/dataReading'
import { withListeHoc } from '../../components/HOCs/withListeHoc'
import { DocumentList } from '../documents/DocumentComponent'
import { useOutletContext } from 'react-router-dom'

export const dataRecentDocuments = [
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

export const dataDossiers = [
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

const DossierListComponent = withListeHoc(DossierList, async({data}) => {
  const result = await getRecentDossier();
  
  const finalData = result.map((item) => ({
    name: `${item.nom} ${item.postnom} ${item.prenom}(${item.etudiant})`,
    isLocked: item.is_locked ? 'locked': 'unlocked',
    id: item.id
  }))
  return finalData;
})

const DocumentListComponent = withListeHoc(DocumentList, async({data}) => {
  const result = await getRecentDocument();
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

export const AccueilComponent = () => {
  const [openRightDrawer, setOpenRightDrawer] = useOutletContext();
  useEffect(() => {
  }, [openRightDrawer]);
  return (
    <div>
      <TitleTypography>Accueil</TitleTypography>
      <SubtitleTypography>Documents recents</SubtitleTypography>
      <Grid container spacing={2} mb={2}>
        <DocumentListComponent openRightDrawer={openRightDrawer} setOpenRightDrawer={setOpenRightDrawer} />
      </Grid>
      <SubtitleTypography>Dossiers</SubtitleTypography>
      <Grid container spacing={2} mb={2}>
        <DossierListComponent openRightDrawer={openRightDrawer} setOpenRightDrawer={setOpenRightDrawer} />
      </Grid>
    </div>
  )
}
