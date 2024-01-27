import { ArrowForward, Info } from '@mui/icons-material'
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, IconButton } from '@mui/material'
import React from 'react'

import { TextTypography } from './commonComponents'

export const CardEtudiant = ({user}) => {
  return (
    <div>
        <Card>
            <CardHeader
                action={
                    <IconButton>
                        <Info />
                    </IconButton>
                }
            />
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Box mb={1}>
                    <Avatar
                        sx={{ width: 120, height: 120 }}
                        alt="Profile"
                        src='https://images.pexels.com/photos/34534/people-peoples-homeless-male.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                    />
                </Box>
                <Box>
                    <TextTypography>Nathan TSHIKWAT</TextTypography>
                </Box>
            </CardContent>
            <CardActions
                sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Button variant='outlined' size='small' sx={{ borderRadius: 15 }}>Docs <ArrowForward /></Button>
            </CardActions>
        </Card>
    </div>
  )
}
