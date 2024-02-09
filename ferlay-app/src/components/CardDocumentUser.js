import { Box, Card, CardActions, CardContent, IconButton } from '@mui/material'
import React from 'react'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { NormalTypography } from './commonComponents';
import { docIcon } from './CardDocument';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

export const CardDocumentUser = ({title, type, user, doc_ref}) => {
  return (
        <Card sx={{ borderRadius: 2}}>
            <CardContent>
                <Box
                sx={{
                    display: 'flex'
                }}
                >
                    <ArticleOutlinedIcon sx={{mr: 1}} color="primary" />
                    <NormalTypography>{title}</NormalTypography>
                </Box>
                <Box
                    display={'flex'}
                    justifyContent='center'
                    alignItems={'center'}
                    mt={3}
                >
                    {docIcon[type]}
                </Box>
            </CardContent>
            <CardActions>
                <IconButton href={doc_ref} size="small"><CloudDownloadIcon /></IconButton>
            </CardActions>
        </Card>
  )
}
