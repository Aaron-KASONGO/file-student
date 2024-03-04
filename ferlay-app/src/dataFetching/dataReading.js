
// Dossier reading api

import { supabase } from "../config/supabaseClient";

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

export const getDossierByName = async (search) => {

    let { data, error } = await supabase
        .from('Dossier')
        .select('*')
        .like('etudiant', `%${search}%`)
        // .in('prenom', search)
        // .in('nom', search)
        // .in('postnom', search)
    
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
        .order("created_at", { ascending: false })
    
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
        .order("created_at", { ascending: false })
    
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
        .select('id, nom_document, extension, doc_ref, Dossier(id, etudiant)')
        .eq('dossier', dossierId)
    
    if (error) {
        alert(error.message);
        return;
    }

    if (data) {
        return data;
    }  
}

// Reading data form demande
export const getAllDemande = async () => {
    let { data, error } = await supabase
    .from('Demande')
    .select('id, content, Dossier(id, etudiant, nom, prenom)')
    .order("created_at", { ascending: false })
    
    if (error) {
        alert(error.message);
        return;
    }

    if (data) {
        return data;
    }  
}