import React, { useRef, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import img from './../../../public/img/bg.jpg';
import photoIcon from './../../../public/img/photo-lg-0.jpg'
import iconClose from './../../../public/img/btn-close.jpg'
import save from './../../../public/img/btn-save.jpg'
import iconCamera from './../../../public/img/iconCameraPng.png'
import iconEdit from './../../../public/img/btn-edit.jpg'
import iconDelete from './../../../public/img/btn-delete.jpg'
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaAngleLeft } from "react-icons/fa6";

const ConsultarMascota = () => {
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
                <label className='flex mr-20 text-white font-semibold'> Consultar mascota </label>
                <img className='flex justify-between rounded-full' src={iconClose} alt="" />
            </div>
            <div className='mt-16'>
                <img className='rounded-full' src={photoIcon} alt="" />
            </div>
        </div>
    );
}

export default ConsultarMascota;