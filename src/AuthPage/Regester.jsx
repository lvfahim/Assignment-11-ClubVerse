import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import { AuthContext } from '../Provider/AuthProvider';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';


const Regester = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const location = useLocation()
    const { Register, setUser, UpData,Google } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false);
    const handleEye = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };
    const heandleFrom = (data) => {
        const profileImg = data.photo[0]
        Register(data.email, data.password)
            .then(result => {
                console.log(result)
                const formData = new FormData();
                formData.append('image', profileImg)
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_hosting}`
                axios.post(image_API_URL, formData)
                    .then(res => {
                        const userProfile = {
                            displayName: data.name,
                            photoURL: res.data.data.url
                        }
                        UpData(userProfile)
                            .then(() => { })
                            .catch(error => console.log(error))
                    })
                setUser(result)
                navigate(`${location.state ? location.state : '/'}`)
            })
            .catch(error => {
                console.log(error)
            })

    }
     const heandleFormGoogle = () => {
            Google()
                .then(result => {
                    console.log(result)
                    Swal.fire({
                        title: "Login Susseccfully",
                        icon: "success",
                        draggable: true
                    });
                    navigate(`${location.state ? location.state : '/'}`)
                })
                .catch(error => {
                    console.log(error)
                    toast('Google login failed. Please try again.')
                })
        }
    return (
        <div className="hero bg-[#cfea6100] min-h-screen">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <h1 className="text-5xl font-bold">Regester Now!</h1>
                    <form onSubmit={handleSubmit(heandleFrom)}>
                        <fieldset className="fieldset">
                            <label className="label">Name</label>
                            <input type="text" {...register('name', { required: true })}
                                className="input" placeholder="Name" />
                            {errors.name?.type === 'required' &&
                                <p className='text-red-500 '>Name is Require</p>}
                            <label className="label">Photo</label>
                            <input type="file" {...register('photo', { required: true })}
                                className="file-input" placeholder="Name" />
                            {errors.photo?.type === 'required' &&
                                <p className='text-red-500 '>Photo is Require</p>}
                            <label className="label">Email</label>
                            <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                            {errors.email?.type === 'required' &&
                                <p className='text-red-500 '>Email is Require</p>}
                            <label className="label">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password", { required: true, minLength: 6 })}
                                    className="input w-full pr-10"
                                    placeholder="Password"
                                />

                                <button
                                    type="button"
                                    onClick={handleEye}
                                    className="absolute right-3 top-3 text-xl text-gray-600"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            {errors.password?.type === 'required' &&
                                <p className='text-red-500 '>Password is Require</p>
                            }
                            {errors.password?.type === 'minLength' &&
                                <p className='text-red-500 '>Password most be 6 Characters</p>
                            }
                            <button className="btn bg-gradient-to-l to-[#8ABEB9] from-[#002455] text-xl text-white border-none btn-neutral mt-4">Register</button>
                            <h2>Don't have an account? <Link className='text-blue-500 underline' to='/auth/login'>Login Now</Link></h2>
                        </fieldset>
                    </form>
                    <div className='flex items-center'>
                        <p>.....................................</p>
                        <p className='text-2xl'>OR</p>
                        <p>....................................</p>
                    </div>
                    <button onClick={heandleFormGoogle} className='btn border-none bg-gradient-to-l to-[#8ABEB9] from-[#002455]  text-white'><FcGoogle /> Login In With Google</button>
                </div>
            </div>
             <ToastContainer />
        </div>

    );
};

export default Regester;