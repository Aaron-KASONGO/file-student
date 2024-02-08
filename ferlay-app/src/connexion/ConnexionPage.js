import { Button, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { supabase } from '../supabaseClient'

export const ConnexionPage = () => {
    const [loading, setLoading] = useState(false);

    const signinWithEmail = (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target
        supabase.auth.signInWithPassword({
            email: form.email.value,
            password: form.password.value,
          }).then((response) => {
            console.log(response)
              if (response.error) {
                  alert(response.error.message)
              } 
              setLoading(false)
          });
    }
  return (
    <Grid container spacing={0} m={0} p={0}>
        <Grid item md={6} display={{ xs: 'none', md: 'block' }}> 
            <img alt='Image' style={{ height: '100vh', width: '100%', margin: 0, padding: 0 }} src='https://images.pexels.com/photos/20064488/pexels-photo-20064488/free-photo-of-mer-aube-paysage-soleil-couchant.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' />
        </Grid>
        <Grid 
            item 
            xs={12} 
            md={6}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Stack
             width={'70%'}
             spacing={3}
             component={'form'}
             onSubmit={signinWithEmail}
            >
                <Typography variant='h4' fontWeight={'bold'}>Connexion</Typography>
                <Typography>Si vous possedez un compte, veuillez remplir le formulaire et vous connecter</Typography>
                <Stack
                    spacing={3}
                >
                    <TextField name='email' id="outlined-basic1" label="Email" variant="outlined" />
                    <TextField name='password' type='password' id="outlined-basic" label="Mot de passe" variant="outlined" />
                    <Button type='submit' disabled={loading} variant='contained' size='large'>Se connecter</Button>
                </Stack>
            </Stack>
        </Grid>
    </Grid>
  )
}
