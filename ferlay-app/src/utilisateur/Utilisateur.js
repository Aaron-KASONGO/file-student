import React, { useEffect, useState } from 'react'
import { Navbar } from './navbar/Navbar'
import { supabase } from '../supabaseClient'
import { getDocumentByDossier, getDossierByEmail } from '../dataFetching/dataReading'

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
        <Navbar dossier={dossier} />
  )
}
