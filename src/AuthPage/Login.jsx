import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Provider/AuthProvider';


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
     const navigate = useNavigate()
    const location = useLocation()
    const {Login}=useContext(AuthContext)
    const heandleFrom = (data) => {
        Login(data.email, data.password)
            .then(result => {
                console.log(result)
                navigate(`${location.state ? location.state : '/'}`)
            })
            .catch(error => {
                console.log(error)
            })

    }
    return (
        <div className="hero bg-[#cfea6100] min-h-screen">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <form onSubmit={ handleSubmit(heandleFrom)}>
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                            {errors.email?.type === 'required' &&
                                <p className='text-red-500 '>Email is Require</p>}
                            <label className="label">Password</label>
                            <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />
                            {errors.password?.type === 'required' &&
                                <p className='text-red-500 '>Password is Require</p>}
                            {errors.password?.type === 'minLength' &&
                                <p className='text-red-500 '>Password most be 6 Characters</p>}
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn btn-neutral mt-4">Login</button>
                           <h2>Don't have an account? <Link className='text-blue-500 underline' to='/auth/regester'>Register Now</Link></h2>

                        </fieldset>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Login;