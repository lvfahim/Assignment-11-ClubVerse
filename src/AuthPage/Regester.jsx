import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import { AuthContext } from '../Provider/AuthProvider';


const Regester = () => {
    const { register ,  handleSubmit,formState: { errors } } = useForm();
     const navigate = useNavigate()
    const location = useLocation()
    const {Register,setUser,UpData}=useContext(AuthContext)
    const heandleFrom = (data)=>{
        const profileImg = data.photo[0]
       Register(data.email,data.password)
       .then(result => {
        console.log(result)
        const formData = new FormData();
        formData.append('image',profileImg)
        const image_API_URL=`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_hosting}`
        axios.post(image_API_URL,formData)
        .then(res => {
            const userProfile={
                displayName:data.name,
                photoURL:res.data.data.url
            }
            UpData(userProfile)
            .then(()=>{})
            .catch(error=>console.log(error))
        })
        setUser(result)
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
                    <h1 className="text-5xl font-bold">Regester Now!</h1>
                    <form onSubmit={ handleSubmit(heandleFrom)}>
                        <fieldset className="fieldset">
                            <label className="label">Name</label>
                            <input type="text" {...register('name', { required: true})}
                            className="input" placeholder="Name" />
                            {errors.name?.type==='required'&& 
                            <p className='text-red-500 '>Name is Require</p>}
                            <label className="label">Photo</label>
                            <input type="file" {...register('photo', { required: true})}
                            className="file-input" placeholder="Name" />
                            {errors.photo?.type==='required'&& 
                            <p className='text-red-500 '>Photo is Require</p>}
                            <label className="label">Email</label>
                            <input type="email" {...register('email',  { required: true})} className="input" placeholder="Email" />
                            {errors.email?.type==='required'&& 
                            <p className='text-red-500 '>Email is Require</p>}
                            <label className="label">Password</label>
                            <input type="password" {...register('password', { required: true,minLength:6})} className="input" placeholder="Password" />
                            {errors.password?.type==='required'&& 
                            <p className='text-red-500 '>Password is Require</p>}
                            {errors.password?.type==='minLength'&& 
                            <p className='text-red-500 '>Password most be 6 Characters</p>}
                            <button className="btn btn-neutral mt-4">Register</button>
                            <h2>Don't have an account? <Link className='text-blue-500 underline' to='/auth/login'>Login Now</Link></h2>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Regester;