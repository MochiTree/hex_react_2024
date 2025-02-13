import { useState,useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Pagination from '../components/Pagination';
import ProductPage from './ProductPage';
import ReactLoading from 'react-loading';


function MainPage(props) {
  const [productDetail, setDetail] = useState(null);//產品頁面:產品細節用
  const [products, setProducts] = useState([]);
  const [isLoading,setIsLoading]=useState(true);
  const [pageStatus, setPageStatus] = useState({});
  
  //取得產品資料，除了初次登入(login)，驗證登入(loginCheck)也可取得資料(同時設定分頁預設值(預設第一頁)
  async function getProducts(page=1) {
    setIsLoading(true)
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/products?page=${page}`);
      console.log(res.data)
      setProducts(res.data.products);
      setPageStatus(res.data.pagination);
    } catch (err) {
      // alert(err.message);
    }finally{
      setIsLoading(false)
    }
  };

  //預設瀏覽頁面為第一頁(page=1)
  function changePage(nowPage){
    getProducts(nowPage);
  }
 


  async function addCart(item){
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/cart`,{
        data:{
          product_id:item.id,
          qty:Number(1),
        }
      });
      alert("已加入購物車");
    }
    catch(err){alert(err)}
}

  //初始化時將資料傳入
    useEffect(()=>{
      getProducts()
    },[]);


  return (
    <>
    <div className="row">
            <div className='col col'>
              <div className='d-flex justify-content-between'>
              <h1 className='fw-bold'>產品列表</h1></div>
        <table className="table">
  <thead>
    <tr>
      <th scope="col">產品名稱</th>
      <th scope="col">原價</th>
      <th scope="col">售價</th>
      <th scope="col">是否啟用</th>
      <th scope="col">查看細節</th>
    </tr>
  </thead>
  <tbody>
    {products.map(function(item){
     return(<tr key={item.id}>
      <th scope="row">{item.title}</th>
      <td>{item.origin_price}</td>
      <td>{item.price}</td>
      <td>{item.is_enabled ? <span className='text-success'>已啟用</span>: <span>未啟用</span>}</td>
      <td><button className='btn btn-primary btn-sm' onClick={()=>setDetail(item)}>查看細節</button></td>
      <td><button className='btn btn-warning btn-sm' onClick={()=>addCart(item)}>加入購物車</button></td>
    </tr>)
    })}
  </tbody>
</table>
      <Pagination pageStatus={pageStatus} changePage={changePage}></Pagination>
</div>
<div className='col col-4'>         
<h1 className='fw-bold'>單一產品細節</h1>
          {productDetail ? <ProductPage productDetail={productDetail} function={addCart}></ProductPage> : <span className='text-muted'>請點選欲觀看產品之細節</span>}
          </div>      
          {isLoading && <div className='d-flex justify-content-center align-items-center'
                        style={{backgroundColor:'rgba(205, 233, 202, 0.4)',position:'fixed',top:0,left:0,right:0,bottom:0}}>
                        <ReactLoading type={'spin'} color={'#000'} height={'3rem'} width={'3rem'} />
                        </div>}
          </div></>
  )
}

export default MainPage;
