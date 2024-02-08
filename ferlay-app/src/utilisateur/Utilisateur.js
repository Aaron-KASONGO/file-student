import React, { useEffect, useState } from 'react'
import { Navbar } from './navbar/Navbar'
import { supabase } from '../supabaseClient'
import { getDossierByEmail } from '../dataFetching/dataReading'

export const Utilisateur = () => {
    const [session, setSession] = useState(null)
    const [dossier, setDossier] = useState({});

    // console.log(dossier)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            getDossierByEmail(session.user.email)
                .then((data) => {setDossier(data)});
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])
    return (
        <Navbar dossier={dossier} />
  )
}
