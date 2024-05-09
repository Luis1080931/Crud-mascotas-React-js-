import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/pages/Login.jsx"
import ProtectedRoute from "./ProtectedRoute.jsx"
import 'tailwindcss/tailwind.css';


function App() {

  return (
   
    
        <BrowserRouter>    
        {/*   <Sidebar /> */}
            <Routes>
              <Route path="/" element={<Login />} />
              <Route element={<ProtectedRoute />} > 
                
              
              </Route>
            </Routes>

        </BrowserRouter>
      
    
  )
}

export default App;
