import React from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import { getDocumentByDossier } from '../../dataFetching/dataReading';
import { DocumentList } from '../documents/DocumentComponent';
import { withListeHoc } from '../../components/HOCs/withListeHoc';
import { TitleTypography } from '../../components/commonComponents';
import { Grid } from '@mui/material';

const DocumentListComponent = withListeHoc(DocumentList, async({data, id}) => {
    const result = await getDocumentByDossier(id);
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

export const OpenDossier = () => {
    const [openRightDrawer, setOpenRightDrawer] = useOutletContext();
    let { idDossier } = useParams();

  return (
    <>
        <TitleTypography>Documents</TitleTypography>
        <Grid container spacing={2} mb={2}>
            <DocumentListComponent openRightDrawer={openRightDrawer} setOpenRightDrawer={setOpenRightDrawer} id={idDossier} />
        </Grid>
    </>
  )
}
