import React, { useRef, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import img from './../../../public/img/bg.jpg';
import buttonAdd from './../../../public/img/btn-add.jpg'
import iconClose from './../../../public/img/btn-close.jpg'
import dog from './../../../public/img/photo-sm-1.jpg'
import lupa from './../../../public/img/btn-show.jpg'
import iconEdit from './../../../public/img/btn-edit.jpg'
import iconDelete from './../../../public/img/btn-delete.jpg'
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RegistrarMascota from './RegistrarMascota';

const ListarMascota = () => {
    const [mode, setmode] = useState([])
    const [abrirPage, setabrirPage] = useState(false)

    const navigate = useNavigate()

    const ir = () => {
        navigate('/register')
    }

    const actualizar = () => {
        navigate("/actualizar")
    }
    const ajajja = () => {
        navigate("/actualizar")
    }

    const consultar = () => {
       navigate('/consultar')
    }

    return (
        <div
            className='flex flex-col items-center min-h-screen'
            style={{ backgroundImage: `url(${img})`, backgroundPosition: 'center', backgroundRepeat:'no-repeat' }}
        >
            <div className='flex flex-row mt-28 justify-center'>
                <label className='text-white font-semibold'> Administrar Mascotas </label>
                <div className='ml-10'>
                    <img className='rounded-full' src={iconClose} />
                </div>
                
            </div>
            <div className='mt-10'>
                <img className='rounded-full cursor-pointer' src={buttonAdd} onClick={ir} />
            </div>
            <div
                className='flex items-center bg-slate-300 mt-4 w-[360px] rounded-2xl h-24'
            >
               <div>
                    <img className='rounded-full ml-3' src={dog} alt="" />
               </div>
               <div className='flex flex-col ml-4'>
                <label> Karsten </label>
                <label> Bulldog </label>
               </div>
               <div className='flex flex-row ml-20'>
                    <img className='rounded-full mr-2 cursor-pointer' src={lupa} onClick={consultar} alt="" />
                    <img className='rounded-full mr-2 cursor-pointer' src={iconEdit} onClick={() => ajajja()} alt="" />
                    <img className='rounded-full mr-2 cursor-pointer' src={iconDelete} alt="" />
               </div>

            </div>
        </div>
    );
}

export default ListarMascota;