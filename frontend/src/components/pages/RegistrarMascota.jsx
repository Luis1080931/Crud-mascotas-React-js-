import React, { useEffect, useRef, useState } from 'react';
import img from './../../../public/img/bg.jpg';
import photoIcon from './../../../public/img/photo-lg-0.jpg'
import iconClose from './../../../public/img/btn-close.jpg'
import save from './../../../public/img/btn-save.jpg'
import iconCamera from './../../../public/img/iconCameraPng.png'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FaAngleLeft } from "react-icons/fa6";
import axiosClient from './../../service/axiosClient.js'

const RegistrarMascota = ({mode}) => {

    const [formData, setFormData] = useState({
        nombre: '',
        raza: '',
        categoria: '',
        image: '',
        genero: ''
    })
    if(mode === "update"){
        alert("sapo")
    } else if(mode === "create"){
        alert("sapo22")
    }else {
        alert("sapo3")
    }

    const handleChange = () => {
        
    }

    const [generos, setGeneros] = useState([])
    const [razas, setRazas] = useState([])
    const [categorias, setCategorias] = useState([])
    const [users, setUsers] = useState([])

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
 
    const navigate = useNavigate()

    const volver = () => {
        navigate('/dashboard')
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        try {
            const nombreValue = nombre.current.value
            const razaValue = raza.current.value
            const categoriaValue = categoria.current.value
            const imageValue = image.current.value
            const generoValue = genero.current.value

            const data = {
                nombre: nombreValue,
                raza: razaValue,
                categoria:categoriaValue,
                image: imageValue,
                genero: generoValue,
            }

            axiosClient.post('/mascotas/registrar', data).then((response) => {
                console.log(response.data)

                if(response.status == 200){
                    
                    Swal.fire({
                        title: response.data.message,
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'Cool'
                      })
                      navigate('/dashboard')
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
    };

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
                        placeholder='Nombre'
                        value={formData.nombre}
                        className='w-full bg-slate-500 px-3 py-2 rounded-3xl border border-gray-400 bg-transparent focus:outline-none ml-5 placeholder-blue-950'
                        style={{ height: '40px', width: '90%' }}
                        required
                    />
                </div>
                <div className='mb-4'>
                    <select 
                        className='w-[345px] bg-slate-500 px-3 py-2 rounded-3xl border border-gray-400 bg-transparent focus:outline-none ml-5'
                        value={formData.raza}
                        name=""
                        id=""
                    >
                        <option> Seleccione la raza... </option>
                        {razas.map(race => (
                            <option value={race.id}> {race.nombre_raza} </option>
                        ))}
                    </select>
                </div>
                <div className='mb-4'>
                    <select 
                        className='w-[345px] bg-slate-500 px-3 py-2 rounded-3xl border border-gray-400 bg-transparent focus:outline-none ml-5'
                        name="categoria"
                        value={formData.categoria}
                        id=""
                    >
                        <option> Seleccione categoria... </option>
                        {categorias.map(category => (
                            <option value={category.id}> {category.nombre} </option>
                        ))}
                    </select>
                </div>
                <div className='relative mb-4'>
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
          className="cursor-pointer items-center w-auto flex justify-center bg-blue-100 rounded-full border"
        >
          {formData.image ? (
            <div className="relative">
              <button
                type="button"
                className="absolute top-0 right-0 p-1 bg-gray-300 rounded-full"
                onClick={() => setFormData({ ...formData, image: "" })}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600"
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
          ) : (
            <div className="flex items-center justify-center w-28 h-28 border border-gray-300 rounded-full hover:bg-gray-50 transition duration-300">
              <span className="text-gray-500 text-center">
                Seleccionar imagen
              </span>
            </div>
          )}
        </label>
                    <img src={iconCamera} alt="camera" className="absolute top-0 right-8 mt-3 ml-3 rounded-full" style={{ width: '20px', height: '20px' }} />
                </div>

                <div className='mb-4'>
                    <div className='relative'>
                        <select 
                            className='w-[345px] bg-slate-500 px-3 py-2 rounded-3xl border border-gray-400 bg-transparent focus:outline-none ml-5'
                            name="genero"
                            value={formData.genero}
                            id=""
                        >
                            <option> Seleccione genero... </option>
                            {generos.map(gender => (
                                <option value={gender.id}> {gender.nombre} </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button>
                <img className='rounded-full ml-4 cursor-pointer' style={{ width: '90%' }} src={save} alt="" onSubmit={handleSubmit} />
                </button>
                
                
            </form>
        </div>
    );
}

export default RegistrarMascota;