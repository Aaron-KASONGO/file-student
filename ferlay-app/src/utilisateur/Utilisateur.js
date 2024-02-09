import React, { useEffect, useState } from 'react'
import { Navbar } from './navbar/Navbar'
import { supabase } from '../supabaseClient'
import { getDocumentByDossier, getDossierByEmail } from '../dataFetching/dataReading'
import { Box, Card, CardContent, Grid, Stack } from '@mui/material'
import { SearchBar } from './searchbar/SearchBar'
import { docIcon } from '../components/CardDocument'

export const Utilisateur = () => {
    const [session, setSession] = useState(null)
    const [dossier, setDossier] = useState({});
    const [documents, setDocuments] = useState([]);

    console.log(documents)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            getDossierByEmail(session.user.email)
                .then((result) => {
                    setDossier(result);
                    getDocumentByDossier(result.id)
                        .then((response) => {
                            setDocuments(response);
                        })
                });
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])
    return (
        <Stack spacing={4}>
            <Navbar dossier={dossier} />
            <Box
                display={'flex'}
                justifyContent={'center'}
            >
                <SearchBar />
            </Box>
            <Grid container>
                
            </Grid>
        </Stack>
  )
}
