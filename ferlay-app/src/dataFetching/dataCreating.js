import { supabase } from "../config/supabaseClient";


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

export const createDemand = async (content, idDossier ) => {
    
    const { data, error } = await supabase
        .from('Demande')
        .insert([
            { content: content, viewed: false, dossier: idDossier },
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
          