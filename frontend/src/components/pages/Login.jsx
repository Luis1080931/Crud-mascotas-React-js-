import React, { useRef, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import img from './../../../public/img/imgLogin.jpg';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const email = useRef(null)
    const password = useRef(null)
    const navigate = useNavigate()

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        try {
            const emailValue = email.current.value
            const passwordValue = password.current.value

            const data = {
                email: emailValue,
                password: passwordValue,
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
            className='flex flex-col items-center justify-center min-h-screen'
            style={{ backgroundImage: `url(${img})`, backgroundPosition: 'center', backgroundRepeat:'no-repeat' }}
        >
            <form onSubmit={handleSubmit} className='w-full max-w-sm mt-96 pt-24'>
                <div className='mb-4'>
                    <input
                        type='email'
                        id='email'
                        placeholder='Correo electronico'
                        ref={email}
                        className='w-full bg-slate-300 px-3 py-2 rounded-3xl border border-gray-400 bg-transparent focus:outline-none ml-5'
                        style={{ height: '40px', width: '90%' }}
                        required
                    />
                </div>
                <div className='mb-4'>
                    <div className='relative'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            ref={password}
                            placeholder='Contraseña'
                            className='w-full bg-slate-300 px-3 py-2 rounded-3xl border border-gray-400 bg-transparent focus:outline-none ml-5'
                            style={{ height: '40px', width: '90%' }}
                            required
                        />
                        <div className='absolute inset-y-0 right-3 flex items-center mr-6'>
                            {showPassword ? (
                                <FaEyeSlash className='text-gray-500 cursor-pointer' onClick={handleTogglePassword} />
                            ) : (
                                <FaEye className='text-gray-500 cursor-pointer' onClick={handleTogglePassword} />
                            )}
                        </div>
                    </div>
                </div>
                <button type='submit' className='w-full bg-blue-950 rounded-3xl text-white py-2 ml-5 px-4 hover:bg-blue-900' style={{ width: '90%' }}>Ingresar</button>
            </form>
        </div>
    );
}

export default Login;