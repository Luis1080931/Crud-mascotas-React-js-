import React, { useContext, useEffect, useRef, useState } from 'react';
import img from './../../../public/img/bg.jpg';
import photoIcon from './../../../public/img/photo-lg-0.jpg'
import iconClose from './../../../public/img/btn-close.jpg'
import save from './../../../public/img/btn-save.jpg'
import modificar from './../../../public/img/btn-update.jpg'
import iconCamera from './../../../public/img/iconCameraPng.png'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FaAngleLeft } from "react-icons/fa6";
import axiosClient from './../../service/axiosClient.js'
import {MascotasContext} from './../../context/MascotasContext.jsx'

const FormMascotas = ({ mode }) => {

    const [generos, setGeneros] = useState([])
    const [razas, setRazas] = useState([])
    const [categorias, setCategorias] = useState([])
    const [users, setUsers] = useState([])
    const {createMascotas, updateMascotas, idMascota} = useContext(MascotasContext)
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        nombre: '',
        raza: '',
        categoria: '',
        image: '',
        genero: ''
    })

    useEffect(() => {
        axiosClient.get('/opciones/genero').then((response) => {
            console.log(response.data);
            setGeneros(response.data)
        })

        axiosClient.get('/opciones/razas').then((response) => {
            console.log(response.data);
            setRazas(response.data)
        })

        axiosClient.get('/opciones/categorias').then((response) => {
            console.log(response.data);
            setCategorias(response.data)
        })

        axiosClient.get('/opciones/users').then((response) => {
            console.log(response.data);
            setUsers(response.data)
        })
    }, [])

    useEffect(() => {
        if(mode === 'update' && idMascota){
            setFormData({
                nombre: idMascota.nombre,
                raza: idMascota.raza,
                categoria: idMascota.categoria,
                image: idMascota.image,
                genero: idMascota.genero
            })
            console.log('Datos mascota:' ,idMascota);
        }
    }, [mode, idMascota])

    const handleChange = (e) => {
        const {name, value, type, files } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'file' ? files[0] : value
        }))
    }

    const volver = () => {
        navigate('/dashboard')
    }

    const handleSubmit = async (e) => {
       
        e.preventDefault()
            const datosSubmit = new FormData()
            datosSubmit.append('nombre', formData.nombre)
            datosSubmit.append('raza', formData.raza)
            datosSubmit.append('categoria', formData.categoria)
            datosSubmit.append('image', formData.image)
            datosSubmit.append('genero', formData.genero)

            try {
                if(mode === 'update'){
                    console.log('Id de la mascota que se quiere actualizar', idMascota.id);
                    await updateMascotas(idMascota, datosSubmit)
                }else{
                    await createMascotas(datosSubmit)
                }
            } catch (error) {
            console.log('Error del servidor' + error);
        }
    }

        return (
            <div
                className='flex flex-col items-center min-h-screen'
                style={{ backgroundImage: `url(${img})`, backgroundPosition: 'center', backgroundRepeat:'no-repeat' }}
            >
                <div className='flex mt-28 items-center justify-between'>
                    <FaAngleLeft className='mr-20 flex text-white text-xl cursor-pointer' onClick={volver} />
                    <label className='flex mr-20 text-white font-semibold'> {mode === "create" ? "Adicionar mascota" : "Actualizar mascota"} </label>
                    <img className='flex justify-between rounded-full' src={iconClose} alt="" />
                </div>
                <div className='mt-16'>
                    <img className='rounded-full' src={photoIcon} alt="" />
                </div>
                 <form onSubmit={handleSubmit} className='w-full max-w-sm pt-24'>
                    <div className='mb-4'>
                        <input
                            type='text'
                            id='nombre'
                            name='nombre'
                            placeholder='Nombre'
                            value={formData.nombre}
                            onChange={handleChange}
                            className='w-full bg-[#8d9db9] px-3 py-2 rounded-3xl border border-gray-400 bg-transparent focus:outline-none ml-5 placeholder-blue-950'
                            style={{ height: '40px', width: '90%' }}
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <select 
                           
                            className='w-[345px] bg-[#8d9db9] px-3 py-2 rounded-3xl border border-gray-400 bg-transparent focus:outline-none ml-5 placeholder-blue-950'
                            value={formData.raza}
                            onChange={handleChange}
                            name="raza"
                            id="raza"
                        >
                            <option> Seleccione la raza... </option>
                            {razas.map(race => (
                                <option value={race.id_raza}> {race.nombre_raza} </option>
                            ))}
                        </select>
                    </div>
                    <div className='mb-4'>
                        <select 
                            className='w-[345px] bg-[#8d9db9] px-3 py-2 rounded-3xl border border-gray-400 bg-transparent focus:outline-none ml-5 placeholder-blue-950'
                            name="categoria"
                            value={formData.categoria}
                            onChange={handleChange}
                            id=""
                        >
                            <option> Seleccione categoria... </option>
                            {categorias.map(category => (
                                <option value={category.id_categoria}> {category.nombre_categoria} </option>
                            ))}
                        </select>
                    </div>
                    <div className='relative mb-4 flex justify-center'>
                    <input
                        placeholder="Imagen de usuario"
                        type="file"
                        name="image"
                        className="hidden"
                        id="fileInput"
                        onChange={handleChange}
                    />
                    <label
                    htmlFor="fileInput"
                    className="cursor-pointer items-center w-[345px] flex bg-[#8d9db9] rounded-full border"
                    >
                    {/* {formData.image ? (
                        <div className="relative">
                        <button
                            type="button"
                            className="absolute top-0 right-0 p-1 bg-gray-300 rounded-full"
                            onClick={() => setFormData({ ...formData, image: "" })}
                        >
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-blue-950"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                            </svg>
                        </button>
                        {mode === "update" && typeof formData.image === "string" ? (
                            <img
                            src={`http://localhost:4000/img/${formData.image}`}
                            alt="user"
                            className="h-28 w-28 object-cover rounded-full mx-auto"
                            />
                        ) : (
                            <img
                            src={URL.createObjectURL(formData.image)}
                            alt="user"
                            className="h-28 w-28 object-cover rounded-full mx-auto"
                            />
                        )}
                        </div>
                    ) : ( */}
                        <div className="flex items-center w-[200px] h-10 transition duration-300">
                        <span className="text-blue-950 w-full ml-4">
                            Seleccionar imagen
                        </span>
                        </div>
                   {/*  )} */}
                    </label>
                        <img src={iconCamera} alt="camera" className="absolute top-0 right-8 mt-3 ml-3 rounded-full" style={{ width: '20px', height: '20px' }} />
                    </div>
    
                    <div className='mb-4'>
                        <div className='relative'>
                            <select 
                                className='w-[345px] bg-[#8d9db9] px-3 py-2 rounded-3xl border border-gray-400 bg-transparent focus:outline-none ml-5 placeholder-blue-950'
                                name="genero"
                                value={formData.genero}
                                onChange={handleChange}
                                id=""
                            >
                                <option> Seleccione genero... </option>
                                {generos.map(gender => (
                                    <option value={gender.id_genero}> {gender.nombre_genero} </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button>
                        {mode === 'create' ? (
                            <img className='rounded-full ml-5 cursor-pointer' style={{ width: '90%' }} src={save} alt="" onSubmit={handleSubmit} />

                        ): <img className='rounded-full ml-5 cursor-pointer' style={{ width: '90%' }} src={modificar} alt="" onSubmit={handleSubmit} />}
                    </button>
                    
                    
                </form>
            </div>
        );
}

export default FormMascotas
