import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/pages/Login.jsx"
import ProtectedRoute from "./ProtectedRoute.jsx"
import ListarMascota from "./components/pages/ListarMascota.jsx";
import ConsultarMascota from "./components/pages/ConsultarMascota.jsx";
import FormMascotas from "./components/pages/FormMascotas.jsx";
import { MascotasProvider } from "./context/MascotasContext.jsx";
import 'tailwindcss/tailwind.css';


function App() {

  return (
   
        <MascotasProvider>
          <BrowserRouter>    
          

          {/*   <Sidebar /> */}
            <Routes>
              <Route path="/" element={<Login />} />
              <Route element={<ProtectedRoute />} > 
                <Route path="/dashboard" element={<ListarMascota />} />
                <Route path="/register" element={<FormMascotas />} />
                <Route path="/actualizar/:id" element={<FormMascotas />} />
                <Route path="/consultar/:id" element={<ConsultarMascota />} />
              </Route>
            </Routes> 
          </BrowserRouter>
        </MascotasProvider>
    
  )
}

export default App;
