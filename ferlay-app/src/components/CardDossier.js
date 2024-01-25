import { Card, CardContent, Stack } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

import FolderIcon from '@mui/icons-material/Folder';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import { TextTypography } from './commonComponents';

const isLock = {
    locked: <LockIcon />,
    unlocked: <LockOpenIcon />
}

export const CardDossier = () => {
  return (
    <div>
        <Card sx={{height: 60}}>
            <CardContent>
                <Box
                    display={'flex'}
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <Stack direction={'row'} spacing={2}>
                        <FolderIcon color='primary' />                        
                        <TextTypography>KABAMBA KALUNDA Olivier</TextTypography>
                    </Stack>
                    <Box>
                        <LockIcon />
                    </Box>
                </Box>
            </CardContent>
        </Card>
    </div>
  )
}
