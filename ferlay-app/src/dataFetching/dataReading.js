import { supabase } from "../supabaseClient"

export const getAllDossier = async () => {

    let { data, error } = await supabase
        .from('Dossier')
        .select('*')
    
    if (error) {
        alert(error.message);
        return;
    }

    if (data) {
        return data;
    }
        
}

export const getRecentDossier = async () => {

    let { data, error } = await supabase
        .from('Dossier')
        .select('*')
        .limit(10)
    
    if (error) {
        alert(error.message);
        return;
    }

    if (data) {
        return data;
    }
        
}

export const getAllDocument = async () => {

    let { data, error } = await supabase
        .from('Document')
        .select('id, nom_document, extension, Dossier(id, etudiant)')
    
    if (error) {
        alert(error.message);
        return;
    }

    if (data) {
        return data;
    }
        
}

export const getRecentDocument = async () => {

    let { data, error } = await supabase
        .from('Document')
        .select('id, nom_document, extension, Dossier(id, etudiant)')
        .limit(4)
    
    if (error) {
        alert(error.message);
        return;
    }

    if (data) {
        return data;
    }
        
}