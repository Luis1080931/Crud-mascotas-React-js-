import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/pages/Login.jsx"
import ProtectedRoute from "./ProtectedRoute.jsx"
import ListarMascota from "./components/pages/ListarMascota.jsx";
import RegistrarMascota from "./components/pages/RegistrarMascota.jsx";
import ActualizarMascota from "./components/pages/ActualizarMascota.jsx";
import ConsultarMascota from "./components/pages/ConsultarMascota.jsx";
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
                <Route path="/register" element={<RegistrarMascota mode="create" />} />
                <Route path="/actualizar" element={<RegistrarMascota mode="update" />} />
                <Route path="/consultar/:id" element={<ConsultarMascota />} />
              </Route>
            </Routes> 
          </BrowserRouter>
        </MascotasProvider>
    
  )
}

export default App;
