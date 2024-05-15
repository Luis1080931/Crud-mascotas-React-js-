import React, { Children, createContext, useState } from 'react'
import axiosClient from '../service/axiosClient.js'
import axios from 'axios'

const MascotasContext = createContext()

const MascotasProvider = ({ children }) => {

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

    const getMascotasId = (id) => {
        try {
            axiosClient.get(`/mascotas/buscar/${id}`).then((response) => {
                setMascota(response.data)
            })
        } catch (error) {
            console.log('Error del servidor' + error);
        }
    }

    const createMascotas = (data) => {
        try {
            axiosClient.post('/mascotas/registrar', data).then((response) => {
                alert(response.data.message)
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

export default MascotasContext
