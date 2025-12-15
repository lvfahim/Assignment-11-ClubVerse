import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hook/useAxiosSecure';


const Login = () => {
    const Axios = useAxiosSecure()
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const navigate = useNavigate()
    const location = useLocation()
    const { Login, ForgetPasssword, Google } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false);
    const handleEye = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };
    const heandleFrom = (data) => {
        Login(data.email, data.password)
            .then(() => {
                navigate(`${location.state ? location.state : '/'}`)
            })
            .catch(error => {
                console.log(error)
            })

    }
    const handleForget = () => {
        const email = getValues("email");

        if (!email) {
            toast("Please enter your email first!");
            return;
        }

        ForgetPasssword(email)
            .then(() => {
                toast("Password reset email sent! Check your inbox.");
            })
            .catch(err => {
                console.log(err.message);
            });
    };
    const heandleFormGoogle = () => {
        Google()
            .then(result => {

                const userInfo = {
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL
                }
                Axios.post('/users', userInfo)
                    .then(()=> {
                        navigate(location.state || '/');
                    })
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
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <form onSubmit={handleSubmit(heandleFrom)}>
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                            {errors.email?.type === 'required' &&
                                <p className='text-red-500 '>Email is Require</p>}
                            <label className="label">Password</label>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Minimum 6 characters required"
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                                            message: "Must contain at least one uppercase & one lowercase letter"
                                        }
                                    })}
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

                            {/* Error Message */}
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                            {errors.password?.type === 'minLength' &&
                                <p className='text-red-500 '>Password most be 6 Characters</p>
                            }
                            <div>
                                <button
                                    type="button"
                                    className="link link-hover text-blue-600"
                                    onClick={handleForget}
                                >
                                    Forgot password?
                                </button>
                            </div>
                            <button className="btn bg-linear-to-l to-[#8ABEB9] from-[#002455] text-xl text-white border-none btn-neutral mt-4">Login</button>
                            <h2>Don't have an account? <Link className='text-blue-500 underline' to='/auth/regester'>Register Now</Link></h2>

                        </fieldset>
                    </form>
                    <div className='flex items-center'>
                        <p>.....................................</p>
                        <p className='text-2xl'>OR</p>
                        <p>....................................</p>
                    </div>
                    <button onClick={heandleFormGoogle} className='btn border-none bg-linear-to-l to-[#8ABEB9] from-[#002455]  text-white'><FcGoogle /> Login In With Google</button>
                </div>
                <ToastContainer />
            </div>
        </div>

    );
};

export default Login;