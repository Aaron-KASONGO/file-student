import { supabase } from "../supabaseClient"

// Dossier reading api

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

export const getDossierById = async (id) => {

    
    let { data, error } = await supabase
        .from('Dossier')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        alert(error.message);
        return;
    }

    if (data) {
        return data;
    }  
}

export const getDossierByEmail = async (email) => {
    
    let { data, error } = await supabase
        .from('Dossier')
        .select('*')
        .eq('etudiant', email)
        .single();

    if (error) {
        alert(error.message);
        return;
    }

    if (data) {
        return data;
    }  
}

// Document reading api

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

export const getDocumentById = async (id) => {

    
    let { data, error } = await supabase
        .from('Document')
        .select('*')
        .eq('id', id)
        .single();

    
    if (error) {
        alert(error.message);
        return;
    }

    if (data) {
        return data;
    }  
}

export const getDocumentByDossier = async (dossierId) => {
    
    let { data, error } = await supabase
        .from('Document')
        .select('*')
        .eq('dossier', dossierId)
    
    if (error) {
        alert(error.message);
        return;
    }

    if (data) {
        return data;
    }  
}