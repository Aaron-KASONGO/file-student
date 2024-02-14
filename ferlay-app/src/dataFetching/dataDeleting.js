import { supabase } from "../config/supabaseClient";

export const deleteDocumentById = async (idDoc ) => {
    const { error } = await supabase
        .from('Document')
        .delete()
        .eq('id', idDoc)

    if (error) {
        alert(error.message);
        return;
    } else {
        return {state: "success"}
    }
}