import React from 'react'
import Joi from "joi"
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'

type typeData = {
    id?: number
    name: string,
    price: number,
    image: string,
    desc: string
}

const productSchema = Joi.object({
    id: Joi.number(),
    name: Joi.string().required(),
    price: Joi.number().required().positive(),
    image: Joi.string(),
    desc: Joi.string()

})

const Edit = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<typeData>({
        resolver: joiResolver(productSchema),
        defaultValues: {
            name: "",
            price: 0,
            image: "",
            desc: ""
        }
    })
    useQuery({
        queryKey: ["products", id],
        queryFn:async()=>{
            const res = await axios.get(`http://localhost:3000/products/${id}`)
            reset(res.data)
            return res.data
        }
    })
    const mutation = useMutation({
        mutationFn: async (formData: typeData) => {
            const res = await axios.put(`http://localhost:3000/products/${formData.id}`, formData)
            return res.data
        },
        onSuccess: () => {
            alert("sua thanh cong ")
            navigate("/products")
        }
    })
    const onsubmit = (formData: typeData) => {
        mutation.mutate(formData)
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onsubmit)}>
                <h2>Sửa sản phẩm </h2>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Tên sản phẩm</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" {...register("name", { required: true })} />
                    {errors?.name && (
                        <div id="emailHelp" className="form-text text-danger">{errors?.name?.message}</div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Ảnh sản phẩm</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" {...register("image", { required: true })} />
                    {errors?.image && (
                        <div id="emailHelp" className="form-text text-danger">{errors?.image?.message}</div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Giá sản phẩm</label>
                    <input type="number" className="form-control" id="exampleInputEmail1" {...register("price", { required: true })} />
                    {errors?.price && (
                        <div id="emailHelp" className="form-text text-danger">{errors?.price?.message}</div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Mô tả sản phẩm</label>
                    <textarea cols={30} rows={10} {...register("desc")} />

                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Edit