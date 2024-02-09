import { Box, Card, CardContent, Grid } from '@mui/material'
import React from 'react'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { NormalTypography } from './commonComponents';
import { docIcon } from './CardDocument';

export const CardDocumentUser = ({title, type, user}) => {
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
        </Card>
  )
}
