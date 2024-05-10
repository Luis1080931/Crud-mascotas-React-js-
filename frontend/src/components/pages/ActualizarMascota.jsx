import React, { useRef, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import img from './../../../public/img/bg.jpg';
import photoIcon from './../../../public/img/photo-lg-0.jpg'
import iconClose from './../../../public/img/btn-close.jpg'
import modificar from './../../../public/img/btn-update.jpg'
import iconCamera from './../../../public/img/iconCameraPng.png'
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaAngleLeft } from "react-icons/fa6";

const ActualizarMascota = () => {
    const [showPassword, setShowPassword] = useState(false);

    const nombre = useRef(null)
    const raza = useRef(null)
    const categoria = useRef(null)
    const image = useRef(null)
    const genero = useRef(null)

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

            axios.post('http://localhost:3000/user/validar', data).then((response) => {
                console.log(response.data)

                if(response.status == 200){
                    localStorage.setItem("token", response.data.token)
                    Swal.fire({
                        title: 'Genial!',
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
                <label className='flex mr-20 text-white font-semibold'> Modificar mascota </label>
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
                        ref={nombre}
                        className='w-full bg-slate-500 px-3 py-2 rounded-3xl border border-gray-400 bg-transparent focus:outline-none ml-5 placeholder-blue-950'
                        style={{ height: '40px', width: '90%' }}
                        required
                    />
                </div>
                <div className='mb-4'>
                    <select 
                        className='w-[345px] bg-slate-500 px-3 py-2 rounded-3xl border border-gray-400 bg-transparent focus:outline-none ml-5'
                        ref={raza}
                        name=""
                        id=""
                    >
                        <option> Seleccione la raza... </option>
                    </select>
                </div>
                <div className='mb-4'>
                    <select 
                        className='w-[345px] bg-slate-500 px-3 py-2 rounded-3xl border border-gray-400 bg-transparent focus:outline-none ml-5'
                        name="categoria"
                        ref={categoria}
                        id=""
                    >
                        <option> Seleccione categoria... </option>
                    </select>
                </div>
                <div className='relative mb-4'>
                    <input
                        type='file'
                        id='image'
                        ref={image}
                        className='w-full bg-slate-500 px-3 py-2 rounded-3xl border border-gray-400 bg-transparent focus:outline-none ml-5'
                        style={{ height: '40px', width: '90%' }}
                        required
                    />
                    <img src={iconCamera} alt="camera" className="absolute top-0 right-8 mt-3 ml-3 rounded-full" style={{ width: '20px', height: '20px' }} />
                </div>

                <div className='mb-4'>
                    <div className='relative'>
                        <select 
                            className='w-[345px] bg-slate-500 px-3 py-2 rounded-3xl border border-gray-400 bg-transparent focus:outline-none ml-5'
                            name="genero"
                            ref={genero}
                            id=""
                        >
                            <option> Seleccione genero... </option>
                        </select>
                    </div>
                </div>
               
                <img className='rounded-full ml-4 cursor-pointer' style={{ width: '90%' }} src={modificar} alt="" />
                
            </form>
        </div>
    );
}

export default ActualizarMascota;