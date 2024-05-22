import React, { Children, createContext, useState } from 'react'
import axiosClient from '../service/axiosClient.js'
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const MascotasContext = createContext()

export const MascotasProvider = ({ children }) => {

    const [mascotas, setMascotas] = useState([])
    const [mascota, setMascota] = useState([])
    const [idMascota, setIdMascota] = useState([])

    const getMascotas = () => {
        try {
            axiosClient.get('/mascotas/listar').then((response) => {
                setMascotas(response.data)
            })
        } catch (error) {
            console.log('Error del servidor' + error);
        }
    }

    const getMascotasId = async (id) => {
        if (!id) {
            console.error("No ID provided to getMascotasId");
            return;
        }
        try {
            const response = await axiosClient.get(`/mascotas/buscar/${id}`);
            setMascota(response.data);
        } catch (error) {
            console.log('Error del servidor' + error);
        }
    };

    const createMascotas = (data) => {
        try {
            axiosClient.post('/mascotas/registrar', data).then((response) => {
                if(response.status === 200){
                    Swal.fire({
                        title: response.data.message,
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'Cool'
                      })
                      getMascotas()
                }
            })
        } catch (error) {
            console.log('Error del servidor' + error);
        }
    }

    const updateMascotas = (id, data) => {
        try {
            axiosClient.put(`/mascotas/actualizar/${id}`, data).then((response) => {
                alert(response.data.message)
            })
        } catch (error) {
            console.log('Error del servidor' + error);
        }
    }

    const deleteMascotas = (id) => {
        try {
            axiosClient.delete(`/mascotas/eliminar/${id}`).then((response) => {
                alert(response.data.message)
            })
        } catch (error) {
            console.log('Error del servidor' + error);
        }
    }

  return (
    <MascotasContext.Provider
        value={{
            idMascota, 
            mascotas,
            mascota,
            setMascotas,
            setMascota,
            setIdMascota,
            createMascotas,
            updateMascotas,
            getMascotas,
            getMascotasId,
            deleteMascotas
        }}
    >
        {children}
    </MascotasContext.Provider>
  )
}
