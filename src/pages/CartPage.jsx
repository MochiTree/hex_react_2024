import {useEffect, useState} from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';


function CartPage(){
    const [cart,setCart]=useState({});
    async function getCart(){
        try{
            const res= await axios.get(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/cart`);
            setCart(res.data.data);
            console.log(res.data.data);
            }catch(err){
                alert(err);
            }
        
    }
    useEffect(()=>{
        getCart();
    },[]);

    async function updateCart(item,qty){
        if(qty>0){
        try{
            await axios.put(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/cart/${item.id}`,{
                data:{
                    product_id:item.product_id,
                    qty:Number(qty)
                }
            });
            getCart();
        }catch(err){
            alert(err);
        }}else{
        alert('數量不得小於1');}
    }

    async function deleteAllCart(){
        try{
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/carts`);
            getCart();
            alert('已清除購物車');
        }catch(err){
            alert(err);
        }
    }
    async function deleteSingleItem(item){
        try{
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/cart/${item.id}`);
            getCart();
        }catch(err){
            alert(err);
        }
    }

    const {
        register,
        handleSubmit,
        formState:{errors}
    }=useForm()

    const onSubmit=handleSubmit((data)=>{
        console.log(data);
    })

    return <><table className="table align-middle">
                <thead>
                <tr>
                    <th></th>
                    <th>品名</th>
                    <th style={{ width: "150px" }}>數量/單位</th>
                    <th className="text-end">單價</th>
                </tr>
                </thead>

                <tbody>
                    {cart.carts?.map(function(item){
                        return (           
                <tr key={item.id}>
                <td>
                <button type="button" className="btn btn-outline-danger btn-sm" onClick={()=>deleteSingleItem(item)}>
                    x
                </button>
                </td>
                <td>{item.product.title}</td>
                <td style={{ width: "150px" }}>
                <div className="d-flex align-items-center">
                    <div className="btn-group me-2" role="group">
                    <button
                        type="button"
                        className="btn btn-outline-dark btn-sm"
                        onClick={()=>updateCart(item,item.qty-1)}
                    >
                        -
                    </button>
                    <span
                        className="btn border border-dark"
                        style={{ width: "50px", cursor: "auto" }}
                    >{item.qty}</span>
                    <button
                        type="button"
                        className="btn btn-outline-dark btn-sm"
                        onClick={()=>updateCart(item,item.qty+1)}
                    >
                        +
                    </button>
                    </div>
                    <span className="input-group-text bg-transparent border-0">
                    {item.product.unit}
                    </span>
                </div>
                </td>
                <td className="text-end">{item.total}</td>
            </tr>
                    )})}
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan="3" className="text-end">
                    總計：
                    </td>
                    <td className="text-end" style={{ width: "130px" }}>{cart.total}</td>
                </tr>
                <tr>
                    <td colSpan="4"><button className='btn btn-danger' onClick={deleteAllCart}>清空購物車</button></td>
                </tr>
                </tfoot>
            </table>
                   <div className="my-5 row justify-content-center">
                    <form onSubmit={onSubmit} className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                        Email
                        </label>
                        <input
                        {...register('email',{
                            required:'Email 為必填欄位',
                            pattern:{
                                value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message:'格式錯誤'
                            }
                        })}
                        id="email"
                        type="email"
                        className={`form-control ${errors.email && 'is-invalid'}`}
                        placeholder="請輸入 Email"
                        />

                        {errors.email &&<p className="text-danger my-2">{errors.email.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                        收件人姓名
                        </label>
                        <input
                        {...register('name',{
                            required:'姓名 為必填欄位'
                        })}
                        id="name"
                        className={`form-control ${errors.name && 'is-invalid'}`}
                        placeholder="請輸入姓名"
                        />

                        {errors.name &&<p className="text-danger my-2">{errors.name.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="tel" className="form-label">
                        收件人電話
                        </label>
                        <input
                        {...register('tel',{
                            required:'電話 為必填欄位',
                            pattern:{
                                value:/^(0[2-8]\d{7}|09\d{8})$/,
                                message:'電話格式錯誤 (家電/手機皆可)'
                            }
                        })}
                        id="tel"
                        type="text"
                        className={`form-control ${errors.tel && 'is-invalid'}`}
                        placeholder="請輸入電話"
                        />

                        {errors.tel &&<p className="text-danger my-2">{errors.tel.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">
                        收件人地址
                        </label>
                        <input
                        id="address"
                        type="text"
                        className="form-control"
                        placeholder="請輸入地址"
                        />

                        <p className="text-danger my-2"></p>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="message" className="form-label">
                        留言
                        </label>
                        <textarea
                        id="message"
                        className="form-control"
                        cols="30"
                        rows="10"
                        ></textarea>
                    </div>
                    <div className="text-end">
                        <button type="submit" className="btn btn-danger">
                        送出訂單
                        </button>
                    </div>
                    </form>
                </div>
            
            </>
            
}

export default CartPage