import React from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { motion } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import useAuth from "../Hook/useAuth";
import useAxiosSecure from "../Hook/useAxiosSecure";

const CreateClub = () => {
    const { user } = useAuth();
    const Axios = useAxiosSecure();
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            managerEmail: user?.email || "" 
        }
    });
    const formRef = useRef(null);

    useEffect(() => {
        gsap.from(formRef.current, {
            y: 50,
            duration: 0.8,
            ease: "power3.out",
        });
    }, []);

    const handleForm = async (data) => {
        try {
            // 1️⃣ Get the file
            const file = data.photo[0];
            const formData = new FormData();
            formData.append('image', file);

            // 2️⃣ Upload to image hosting API (imgBB)
            const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_hosting}`;
            const response = await axios.post(image_API_URL, formData);

            // 3️⃣ Get the uploaded image URL
            const imageUrl = response.data.data.url;

            // 4️⃣ Attach image URL to your form data
            const clubData = {
                ...data,
                photoUrl: imageUrl,  // ✅ Add URL here
                status: "pending",
                createdAt: new Date(),
                updatedAt: new Date()
            };

            console.log(clubData);

            // 5️⃣ Reset the form
            reset();
        } catch (error) {
            console.error("Image upload failed:", error);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
            <motion.form
                ref={formRef}
                onSubmit={handleSubmit(handleForm)}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl space-y-4"
            >
                <h2 className="text-2xl font-bold text-center mb-4">Create a Club</h2>

                <fieldset className="fieldset">
                    <label className="label">Club Name</label>
                    <input {...register("clubName", { required: true })} placeholder="Club Name" className="input input-bordered w-full" type="text" />
                    {errors.clubName && <p className="text-red-500 text-sm">Club name is required</p>}

                    <label className="label">Description</label>
                    <textarea {...register("description", { required: true })} placeholder="Description" className="textarea textarea-bordered w-full" rows="4" />
                    {errors.description && <p className="text-red-500 text-sm">Description is required</p>}

                    <label className="label">Category</label>
                    <input {...register("category", { required: true })} placeholder="Category (Photography, Sports, etc.)" className="input input-bordered w-full" type="text" />
                    {errors.category && <p className="text-red-500 text-sm">Category is required</p>}

                    <label className="label">Location</label>
                    <input {...register("location", { required: true })} placeholder="Location" className="input input-bordered w-full" type="text" />
                    {errors.location && <p className="text-red-500 text-sm">Location is required</p>}

                    <label className="label">Photo</label> <br />
                    <input type="file" {...register('photo', { required: true })} className="file-input file-input-bordered w-full" /> <br />
                    {errors.photo && <p className='text-red-500 text-sm'>Photo is required</p>}

                    <label className="label">Membership Fee</label>
                    <input {...register("membershipFee", { required: true })} placeholder="Membership Fee (BDT)" className="input input-bordered w-full" type="number" />
                    {errors.membershipFee && <p className="text-red-500 text-sm">Membership fee is required</p>}

                    <label className="label">Manager Email</label>
                    <input {...register("managerEmail", { required: true })} placeholder="Manager Email" className="input input-bordered w-full" type="email" />
                    {errors.managerEmail && <p className="text-red-500 text-sm">Manager email is required</p>}
                </fieldset>

                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn bg-linear-to-l to-[#8ABEB9] from-[#002455]  text-white text-2xl py-3 w-full mt-4" type="submit">
                    Create Club
                </motion.button>
            </motion.form>
        </div>
    );
};

export default CreateClub;
