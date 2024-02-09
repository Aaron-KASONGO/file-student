
// Data updating for Document

import { supabase } from "../config/supabaseClient";

export const UpdateDocumentById = async (nomDocument, id) => {
    const { data, error } = await supabase
        .from('Document')
        .update({ nom_document: nomDocument})
        .eq('id', id)
        .select()

    if (error) {
        alert(error.message);
        return;
    }

    if (data) {
        return data;
    }
}

// Data updating for Dossier

export const UpdateDossiertById = async (email, nom , postnom, prenom, id) => {
    const { data, error } = await supabase
        .from('Dossier')
        .update({ etudiant: email, nom: nom, postnom: postnom, prenom: prenom })
        .eq('id', id)
        .select()

    if (error) {
        alert(error.message);
        return;
    }

    if (data) {
        return data;
    }
}