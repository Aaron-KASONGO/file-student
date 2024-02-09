import { Avatar, Box, Card, CardContent, Tooltip } from '@mui/material'
import React from 'react'

import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AppsIcon from '@mui/icons-material/Apps';

import { NormalTypography } from './commonComponents';

export const docIcon = {
    text: <TextSnippetIcon sx={{ fontSize: 75 }} color="primary" />,
    pdf: <PictureAsPdfIcon sx={{ fontSize: 75 }} color="error" />,
    sheet: <AppsIcon sx={{ fontSize: 75 }} color="success"  />
}

export const CardDocument = ({title, type, user}) => {
  return (
    <div>
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
                <Box>
                    <Tooltip title={user.name}>
                        <Avatar alt={user.name} sx={{ width: 30, height: 30 }} src="https://images.pexels.com/photos/3866555/pexels-photo-3866555.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                    </Tooltip>
                </Box>
            </CardContent>
        </Card>
    </div>
  )
}
