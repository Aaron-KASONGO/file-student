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