import {useEffect, useState} from 'react';
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
        }
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
                <button type="button" className="btn btn-outline-danger btn-sm">
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
                    <td className="text-end" style={{ width: "130px" }}></td>
                </tr>
                <tr>
                    <td colSpan="4"><button className='btn btn-danger' onClick={deleteAllCart}>清空購物車</button></td>
                </tr>
                </tfoot>
            </table></>
}

export default CartPage