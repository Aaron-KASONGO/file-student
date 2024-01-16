import { BrowserRouter as Router, Outlet, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {
            (false) ?
            (
              <Route path='/' element={() => <div>connecté</div>} />
            ):
            (
              <Route path="/" element={() => <div>Connexion</div>} />
            )
          }
        </Routes>
      </Router>
    </>
  );
}

export default App;
