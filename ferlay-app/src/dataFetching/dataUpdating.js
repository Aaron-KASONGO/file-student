import { supabase } from "../supabaseClient";


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
  