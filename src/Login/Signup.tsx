import React from 'react'
import Joi from "joi"
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type typeData = {
    email: string,
    password: string,
    confirmPassword: string,
}

const productSchema = Joi.object({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required().min(6),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")),

})

const Signup = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<typeData>({
        resolver: joiResolver(productSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        }
    })
    const mutation = useMutation({
        mutationFn: async (formData: typeData) => {
            const res = await axios.post(`http://localhost:3000/signup`, formData)
            return res.data
        },
        onSuccess: () => {
            alert("them thanh cong ")
            navigate("/signin")
        }
    })
    const onsubmit = (formData: typeData) => {
        mutation.mutate(formData)
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onsubmit)}>
                <h2>Đăng kí </h2>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" {...register("email", { required: true })} />
                    {errors?.email && (
                        <div id="emailHelp" className="form-text text-danger">{errors?.email?.message}</div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Mật khẩu</label>
                    <input type="password" className="form-control" id="exampleInputEmail1" {...register("password", { required: true })} />
                    {errors?.password && (
                        <div id="emailHelp" className="form-text text-danger">{errors?.password?.message}</div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Nhắc lại mât khẩu</label>
                    <input type="password" className="form-control" id="exampleInputEmail1" {...register("confirmPassword", { required: true })} />
                    {errors?.confirmPassword && (
                        <div id="emailHelp" className="form-text text-danger">{errors?.confirmPassword?.message}</div>
                    )}
                </div>
               

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup