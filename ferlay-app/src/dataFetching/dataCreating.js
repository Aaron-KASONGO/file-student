import { supabase } from "../supabaseClient";


export const createDocument = async ({nomDocument, idDossier, docRef, extension}) => {
    
    const { data, error } = await supabase
        .from('Document')
        .insert([
        { nom_document: nomDocument, dossier : idDossier, doc_ref: docRef, extension: extension },
        ])
        .select()

    if (error) {
        alert(error.message);
        return;
    }

    if (data) {
        return data;
    }
}