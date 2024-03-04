import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import { AccueilComponent } from "./dashboard/accueil/AccueilComponent";
import Dashboard from "./dashboard/dashbaord";
import { DemandeComponent } from "./dashboard/demandes/DemandeComponent";
import { DocumentComponent } from "./dashboard/documents/DocumentComponent";
import { DossierComponent } from "./dashboard/dossiers/DossierComponent";
import { EtudiantComponent } from "./dashboard/etudiants/EtudiantComponent";
import { HistoriqueComponent } from "./dashboard/historique/HistoriqueComponent";
import { useEffect, useState } from "react";
import { ConnexionPage } from "./connexion/ConnexionPage";
import { DocumentUserMain, Utilisateur } from "./utilisateur/Utilisateur";
import { supabase } from "./config/supabaseClient";
import { OpenDossier } from "./dashboard/open-dossier/OpenDossier";
import { DemandeList } from "./utilisateur/demandes/DemandeList";


function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <>
      <Router>
        <Routes>
          {
            (session && session.user) ?
            (
              (session.user.user_metadata.role !== "student") ?
              (
                <Route path='/' element={<Dashboard />}>
                  <Route index element={<AccueilComponent />} />
                  <Route path='documents' element={<DocumentComponent />} />
                  <Route path='dossiers' element={<DossierComponent />} />
                  <Route path='etudiants' element={<EtudiantComponent />} />
                  <Route path='demandes' element={<DemandeComponent />} />
                  <Route path='historique' element={<HistoriqueComponent />} />
                  <Route path='dossiers/:idDossier' element={<OpenDossier />} />
                </Route>
              ):
              (
                <Route path='/' element={<Utilisateur />}>
                  <Route index element={<DocumentUserMain />} />
                  <Route path='/demandes' element={<DemandeList />} />
                </Route>
              )
            ):
            (
              <Route path="*" element={<ConnexionPage />} />
            )
          }
          <Route path="*" element={<div>Page 404</div>} />
        </Routes>
      </Router>
    </>
  );
}

const Layout = () => {
  return(
    <Outlet />
  )
}

export default App;
