import React, { useContext, useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import img from './../../../public/img/bg.jpg';
import buttonAdd from './../../../public/img/btn-add.jpg';
import iconClose from './../../../public/img/btn-close.jpg';
import lupa from './../../../public/img/btn-show.jpg';
import iconEdit from './../../../public/img/btn-edit.jpg';
import iconDelete from './../../../public/img/btn-delete.jpg';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../service/axiosClient.js';
import { MascotasContext } from '../../context/MascotasContext.jsx';

const ListarMascota = () => {
    const [mascotas, setMascotas] = useState([]);
    const { getMascotasId, setIdMascota, setMode } = useContext(MascotasContext)

    useEffect(() => {
        getMascotas();
    }, []);

    const getMascotas = () => {
        axiosClient.get(`/mascotas/listar`).then((response) => {
          const mascotasConImagenes = response.data.map(async (mascota) => {
            const imagePath = await fetchImagePath(mascota.image);
            return { ...mascota, imagePath };
          });
          Promise.all(mascotasConImagenes).then(setMascotas);
        });
      };
    
      const fetchImagePath = async (imagen) => {
        if (!imagen) return '';
    
        const imgPath = `http://localhost:3000/img/${imagen}`;
        const uploadsPath = `http://localhost:3000/imgUploads/${imagen}`;
    
        try {
          const imgResponse = await fetch(imgPath, { method: 'HEAD' });
          if (imgResponse.ok) {
            return imgPath;
          } else {
            const uploadsResponse = await fetch(uploadsPath, { method: 'HEAD' });
            if (uploadsResponse.ok) {
              return uploadsPath;
            } else {
              return '';
            }
          }
        } catch (error) {
          console.error('Error fetching images:', error);
          return '';
        }
      };

    const navigate = useNavigate();

    const ir = () => {
        setMode("create")
        navigate('/register');
    };

    const actualizar = (id) => {
        setMode("update")
        navigate(`/actualizar/${id}`);
        setIdMascota(id)    
    };

    const consultar = async (id) => {
        console.log("Consultando ID:", id)
        if (id) {
            await getMascotasId(id);
            navigate(`/consultar/${id}`);
        } else {
            console.error("ID is undefined");
        }
    };
    
    const eliminar = (id) => {
        try {
            axiosClient.delete(`/mascotas/eliminar/${id}`).then((response) => {
                console.log(response.data)
                if(response.status == 200){
                    
                    Swal.fire({
                        title: response.data.message,
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'Cool'
                      })
                      getMascotas()
                }else if(response.status == 404){
                    Swal.fire({
                        title: 'Error!',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'Cool'
                      })
                }
            })
        } catch (error) {
            
        }
    }

    const logout = () => {
        localStorage.clear();
        navigate('/');
    }

    return (
        <div
            className='flex flex-col items-center min-h-screen'
            style={{ backgroundImage: `url(${img})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
        >
            <div className='flex flex-row mt-28 justify-center'>
                <label className='text-white font-semibold'>Administrar Mascotas</label>
                <div className='ml-10'>
                    <img className='rounded-full cursor-pointer' src={iconClose} onClick={() => logout()} alt="Cerrar" />
                </div>
            </div>
            <div className='mt-10'>
                <img className='rounded-full cursor-pointer' src={buttonAdd} onClick={ir} alt="Agregar" />
            </div>
            <div className='flex flex-col items-center w-[400px] max-w-4xl overflow-hidden mt-6' style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                {mascotas.map((mascota) => (
                    <div
                        key={mascota.id}
                        className='flex items-center bg-slate-300 mt-4 w-[360px] rounded-2xl h-24'
                    >
                        <div>
                        <img
                            className="object-cover rounded-full ml-2"
                            alt={mascota.imagen}
                            src={mascota.imagePath || 'path/to/default/image.jpg'}
                        />
                        </div>
                        <div className='flex flex-col ml-4'>
                            <label>{mascota.nombre_mascota}</label> 
                            <label>{mascota.nombre_raza}</label>
                        </div>
                        <div className='flex flex-row ml-20'>
                            <img className='rounded-full mr-2 cursor-pointer' src={lupa} onClick={() => consultar(mascota.id)} alt="Consultar" />
                            <img className='rounded-full mr-2 cursor-pointer' src={iconEdit} onClick={() => actualizar(mascota.id)} alt="Editar" />
                            <img className='rounded-full mr-2 cursor-pointer' src={iconDelete} alt="Eliminar" onClick={() => eliminar(mascota.id)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListarMascota;
