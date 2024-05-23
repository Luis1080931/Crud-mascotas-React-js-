import React, { Children, createContext, useState } from 'react'
import axiosClient from '../service/axiosClient.js'
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const MascotasContext = createContext()

export const MascotasProvider = ({ children }) => {

    const [mascota, setMascota] = useState([])
    const [idMascota, setIdMascota] = useState(0)
    const [mode, setMode] = useState("create")


    const getMascotasId = async (id) => {
        if (!id) {
            console.error("No ID provided to getMascotasId");
            return;
        }
        try {
            const response = await axiosClient.get(`/mascotas/buscar/${id}`);
            setMascota(response.data[0]);
        } catch (error) {
            console.log('Error del servidor' + error);
        }
    }

  return (
    <MascotasContext.Provider
        value={{
            idMascota,
            mascota,
            mode,
            setMode,
            setMascota,
            setIdMascota,
            getMascotasId
        }}
    >
        {children}
    </MascotasContext.Provider>
  )
}
