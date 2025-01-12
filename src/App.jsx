import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [productDetail, setDetail] = useState(null);
  const [products, setProducts] = useState([]);
  const [isBackEnd, setIsBackEnd] = useState({
    display:'none',
    status:false,
  });
  const [isAdmin, setIsAdmin]=useState(false);

  const [account,setAccount]=useState({
    username:'請輸入信箱',
    password:'請輸入密碼',
  })

  function updateEnter(e){

    setAccount({
      ...account,
      [e.target.name]:e.target.value,
    })
  }

  function login(e){
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_BASE_URL}/v2/admin/signin`,account)
    .then((res) => {
      alert(res.data.message);
      const {token, expired} = res.data;
      document.cookie = `loginToken=${token}; expires=${new Date(expired)}`;
      setIsAdmin(true);

      axios.defaults.headers.common['Authorization'] = `${token}`;

      axios.get(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/admin/products`)
      .then((res)=>setProducts(res.data.products))
      .catch((err)=>alert(err.message))
    })
    .catch((err) => alert('登入失敗  '+err.message))
  }

  //箭頭函式寫法
  // const loginCheck = async() =>{
  //   try{
  //     await axios.post(`${import.meta.env.VITE_BASE_URL}/v2/api/user/check`)
  //     alert('已登入')
  //   }catch(err) {
  //     alert(err.message)
  //     setIsAdmin(false)
  //   }
  // }

  async function loginCheck(){
    try{
      await axios.post(`${import.meta.env.VITE_BASE_URL}/v2/api/user/check`);
      alert('已登入');
    } catch(err) {
      alert(err.message)
      setIsAdmin(false)
    }
  }
  async function backEnd(){
    try{
      await axios.post(`${import.meta.env.VITE_BASE_URL}/v2/api/user/check`);
      if(isBackEnd.display==='block'){
        setIsBackEnd({
          display:'none',
          status:!isBackEnd.status,
        });
      }else if(isBackEnd.display==='none') {
        setIsBackEnd({
          display:'block',
          status:!isBackEnd.status,
        });
      }
    } catch(err) {
      alert(err.message)
      setIsAdmin(false)
    }
  }

  return (
    <>
    { isAdmin ? (<><button className='btn btn-success mb-3 me-2' onClick={backEnd}>{isBackEnd.status ? '產品頁面' : '後台頁面'}</button><button className='btn btn-danger mb-3' onClick={loginCheck}>檢查登入狀態</button><div className="row">
            <div className='col col-8'>
              <h1 className='fw-bold'>產品列表</h1>
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
      <td>{item.is_enabled}</td>
      <td><button className='btn btn-primary btn-sm' onClick={()=>setDetail(item)}>查看細節</button></td>
      <td><button className='btn btn-primary btn-sm' style={{display:`${isBackEnd.display}`}}>編輯</button></td>
    </tr>)
    })}
  </tbody>
</table></div>
  
 <div className='col col-4'>         
          <h1 className='fw-bold'>單一產品細節</h1>
          {productDetail ? (
                <div className="card mb-3">
                  <img src={productDetail.imageUrl} className="card-img-top primary-image"/>
                  <div className="card-body">
                    <h5 className="card-title fw-bold">
                      {productDetail.title}
                      <span className="badge bg-primary ms-2">{productDetail.category}</span>
                    </h5>
                    <p className="card-text">商品描述：{productDetail.description}</p>
                    <p className="card-text">商品內容：{productDetail.content}</p>
                    <div className="d-flex">
                      <p className="card-text text-secondary"><del>{productDetail.origin_price}</del></p>
                      元 / {productDetail.price} 元
                    </div>
                    <h5 className="mt-3">更多圖片：</h5>
                    <div className="d-flex flex-wrap">
                      {productDetail.imagesUrl.map(function(item,index){
                        return <img key={index} src={item} className='img-thumbnail w-25 object-fit-cover'/>
                      })}
                    </div>
                  </div>
                </div>
              ) : <span className='text-muted'>請點選欲觀看產品之細節</span>}
          </div>         
          </div></>) : <><h2 className='mb-5 display-2 fw-bold'>登入</h2><form>
        <div className="form-group mb-3">
          <label htmlFor="email" className='pb-2'>Email</label>
          <input type="email" name='username' className="form-control form-control-lg" id="email" onChange={updateEnter} />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password" className='pb-2'>密碼</label>
          <input type="password" name='password' className="form-control form-control-lg" id="password" onChange={updateEnter} />
        </div>
        <button onClick={login} type="submit" className="btn btn-primary">登入</button>
      </form></>}
    </>
  )
}

export default App
