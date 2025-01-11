import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [productDetail, setDetail] = useState(null);
  const [products, setProducts] = useState([])
  // const [products, setProducts] = useState([
  //   {
  //     category: "甜甜圈",
  //     content: "尺寸：14x14cm",
  //     description: "濃郁的草莓風味，中心填入滑順不膩口的卡士達內餡，帶來滿滿幸福感！",
  //     id: "-L9tH8jxVb2Ka_DYPwng",
  //     is_enabled: 1,
  //     origin_price: 150,
  //     price: 99,
  //     title: "草莓莓果夾心圈",
  //     unit: "元",
  //     num: 10,
  //     imageUrl: "https://images.unsplash.com/photo-1583182332473-b31ba08929c8",
  //     imagesUrl: [
  //       "https://images.unsplash.com/photo-1626094309830-abbb0c99da4a",
  //       "https://images.unsplash.com/photo-1559656914-a30970c1affd"
  //     ]
  //   },
  //   {
  //     category: "蛋糕",
  //     content: "尺寸：6寸",
  //     description: "蜜蜂蜜蛋糕，夾層夾上酸酸甜甜的檸檬餡，清爽可口的滋味讓人口水直流！",
  //     id: "-McJ-VvcwfN1_Ye_NtVA",
  //     is_enabled: 1,
  //     origin_price: 1000,
  //     price: 900,
  //     title: "蜂蜜檸檬蛋糕",
  //     unit: "個",
  //     num: 1,
  //     imageUrl: "https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80",
  //     imagesUrl: [
  //       "https://images.unsplash.com/photo-1618888007540-2bdead974bbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80",
  //     ]
  //   },
  //   {
  //     category: "蛋糕",
  //     content: "尺寸：6寸",
  //     description: "法式煎薄餅加上濃郁可可醬，呈現經典的美味及口感。",
  //     id: "-McJ-VyqaFlLzUMmpPpm",
  //     is_enabled: 1,
  //     origin_price: 700,
  //     price: 600,
  //     title: "暗黑千層",
  //     unit: "個",
  //     num: 15,
  //     imageUrl: "https://images.unsplash.com/photo-1505253149613-112d21d9f6a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fGNha2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
  //     imagesUrl: [
  //       "https://images.unsplash.com/flagged/photo-1557234985-425e10c9d7f1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA5fHxjYWtlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
  //       "https://images.unsplash.com/photo-1540337706094-da10342c93d8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGNha2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
  //     ]
  //   }
  // ]);

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

      axios.defaults.headers.common['Authorization'] = token;

      axios.get(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/admin/products`)
      .then((res)=>setProducts(res.data.products))
      .catch((err)=>alert(err.message))
    })
    .catch((err) => alert('登入失敗  '+err.message))
  }

  return (
    <>
    {isAdmin ? (<><div className="row">
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
      {/* <h2 className='mb-5 display-2 fw-bold'>登入</h2>
      <form>
        <div className="form-group mb-3">
          <label htmlFor="email" className='pb-2'>Email</label>
          <input type="email" name='username' className="form-control form-control-lg" id="email" onChange={updateEnter}/>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password" className='pb-2'>密碼</label>
          <input type="password" name='password' className="form-control form-control-lg" id="password" onChange={updateEnter}/>
        </div>
          <button onClick={login} type="submit" className="btn btn-primary">登入</button>
      </form> */}
    </>
  )
}

export default App
