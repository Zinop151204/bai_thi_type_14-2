import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
type typeData = {
    id?: number
    name: string,
    price: number,
    image: string,
    desc: string
}
const List = () => {
    const queryClient = useQueryClient()
    const { data } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/products`)
            return res.data
        }
    })
    const mutation = useMutation({
        mutationFn: async (id: number) => {
            const confirm = window.confirm("ban co chac uon xoa khong")
            if (confirm) {
                await axios.delete(`http://localhost:3000/products/${id}`)
                alert("xoa thanh cong")
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products']
            })
        }
    })
    return (
        <div>
            <h2>Danh sách sản phẩm</h2>
            <Link to={"/products/add"} className="btn btn-primary">Thêm sản phẩm</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Ảnh sản phẩm</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Mô tả</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item: typeData, index: number) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item?.name}</td>
                            <td><img src={item?.image} alt="" /></td>
                            <td>{item?.price}</td>
                            <td>{item?.desc}</td>
                            <td>
                                <Link to={`/products/${item.id}`} className="btn btn-danger">Sửa</Link>
                                <button onClick={() => mutation.mutate(item.id!)} className="btn btn-primary">Xóa</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default List