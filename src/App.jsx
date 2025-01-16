import { useState,useEffect,useRef } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal} from 'bootstrap';

function App() {
  const [productDetail, setDetail] = useState(null);//產品頁面:產品細節用
  const [products, setProducts] = useState([]);
  const [isBackEnd, setIsBackEnd] = useState({
    display:'none',
    status:false,
  });
  const [isAdmin, setIsAdmin]=useState(false);
  const [modalMode, setModalMode]=useState(null);
  const modalRef =useRef(null);
  // const modalRefMethod = useRef(null);
  const defaultModalState = {
    imageUrl: "",
    title: "",
    category: "",
    unit: "",
    origin_price: "",
    price: "",
    description: "",
    content: "",
    is_enabled: 0,
    imagesUrl: [""]
  };
  const [productContent, setContent]=useState(defaultModalState);//後台頁面:編輯/新增用
  
  function modalInputChange(e) {
    const {name,value,type,checked} = e.target
    setContent({
      ...productContent,
      [name]: type==='checkbox' ? checked : value,
    })
  }

  //當副圖input更改時:找出哪一個input更改，並更新該index之item值
  function changeSubImages(e,index){
    const {value} = e.target;
    const newImages = [...productContent.imagesUrl];
    newImages[index]=value;

    setContent({
      ...productContent,
      imagesUrl:newImages,
    })
    // console.log(productContent)
  }

  const [account,setAccount]=useState({
    username:'請輸入信箱',
    password:'請輸入密碼',
  })

  useEffect(()=>{
    // modalRefMethod.current = new Modal(modalRef.current);
    
    new Modal(modalRef.current);
    console.log(1,modalRef.current);
    console.log(2,Modal.getInstance(modalRef.current));
    //從cookie抓出token，讓每次使用axios的時候把token放入header傳送
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1",
    );
    axios.defaults.headers.common['Authorization'] = token;
    loginCheck();
  },[])


  // 透過 Modal.getInstance(ref) 取得實例
  function handleOpenProductModal(mode,currentItem) {
 
  // 從不同按鈕開啟modal 使用編輯/新增
  setModalMode(mode);
  // (編輯mode下) 之前axios get的產品資料已經用跑map取得，可取得每個item的值來顯示，若是新增mode 則不顯示
  switch (mode){
    case 'edit':
      setContent(currentItem);
      break;
    case 'add':
      setContent(defaultModalState);
      break;
    default:
      break;
  }

    const modalInstance = Modal.getInstance(modalRef.current);
    modalInstance.show();
  }

  function handleCloseProductModal() {
    const modalInstance = Modal.getInstance(modalRef.current);
    modalInstance.hide();
  }
  

  function updateEnter(e){

    setAccount({
      ...account,
      [e.target.name]:e.target.value,
    })
  }

  //login後將token寫入cookie
  function login(e){
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_BASE_URL}/v2/admin/signin`,account)
    .then((res) => {
      alert(res.data.message);
      const {token, expired} = res.data;
      document.cookie = `loginToken=${token}; expires=${new Date(expired)}`;
      setIsAdmin(true);

      axios.defaults.headers.common['Authorization'] = `${token}`;

      getProducts();
    })
    .catch((err) => alert('登入失敗  '+err.message))
  }

  //取得產品資料，除了初次登入(login)，驗證登入(loginCheck)也可取得資料
  async function getProducts() {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/admin/products`);
      setProducts(res.data.products);
    } catch (err) {
      alert(err.message);
    }
  };

  function addImages() {
    const imagesList = [...productContent.imagesUrl,''];
    setContent({
      ...productContent,
      imagesUrl:imagesList,
    })
  }

  function removeImgaes() {
    const imagesList = [...productContent.imagesUrl];
    imagesList.pop();
    setContent({
      ...productContent,
      imagesUrl:imagesList,
    })
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

  //登入驗證，若已經登入的話，token有效時，不用二次登入，同時也可以用getProducts帶入產品資料
  async function loginCheck(){
    try{
      await axios.post(`${import.meta.env.VITE_BASE_URL}/v2/api/user/check`);
      setIsAdmin(true);
      getProducts();
    } catch(err) {
      console.log(err.message)
      setIsAdmin(false)
    }
  };
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
          display:'inline-block',
          status:!isBackEnd.status,
        });
      };
    } catch(err) {
      alert(err.message)
      setIsAdmin(false)
    }
  };

  return (
    <>
     {/* <div className="modal fade" ref={modalRef} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    ...
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
                    <button type="button" className="btn btn-primary">新增</button>
                </div>
                </div>
            </div>
            </div>  */}
              <div id="productModal" ref={modalRef} className="modal fade" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
              <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content border-0 shadow">
                  <div className="modal-header border-bottom">
                    <h5 className="modal-title fs-4">{modalMode==='edit' ? '編輯產品' : '新增產品'}</h5>
                    <button type="button" className="btn-close" onClick={handleCloseProductModal} aria-label="Close"></button>
                  </div>

                  <div className="modal-body p-4">
                    <div className="row g-4">
                      <div className="col-md-4">
                        <div className="mb-4">
                          <label htmlFor="primary-image" className="form-label">
                            主圖
                          </label>
                          <div className="input-group">
                            <input
                              name="imageUrl"
                              type="text"
                              id="primary-image"
                              className="form-control"
                              placeholder="請輸入圖片連結"
                              onChange={modalInputChange}
                              value={productContent.imageUrl}
                            />
                          </div>
                          <img
                            src={productContent.imageUrl}
                            alt=""
                            className="img-fluid"
                          />
                        </div>

                        {/* 副圖 */}
                        <div className="border border-2 border-dashed rounded-3 p-3">
                          {productContent.imagesUrl?.map((image, index) => (
                            <div key={index} className="mb-2">
                              <label
                                htmlFor={`imagesUrl-${index + 1}`}
                                className="form-label"
                              >
                                副圖 {index + 1}
                              </label>
                              <input
                                id={`imagesUrl-${index + 1}`}
                                type="text"
                                placeholder={`圖片網址 ${index + 1}`}
                                className="form-control mb-2"
                                value={image}
                                onChange={function (e){
                                  changeSubImages(e,index)
                                }}
                              />
                              {image && (
                                <img
                                  src={image}
                                  alt={`副圖 ${index + 1}`}
                                  className="img-fluid mb-2"
                                />
                              )}
                            </div>
                          ))}
                            <div className="btn-group w-100">
                              {productContent.imagesUrl.length <5 && productContent.imagesUrl[(productContent.imagesUrl.length)-1] !=='' && <button className="btn btn-outline-primary btn-sm w-100" onClick={addImages}>新增圖片</button>}

                              {productContent.imagesUrl.length >1 && <button className="btn btn-outline-danger btn-sm w-100" onClick={removeImgaes}>取消圖片</button>}
                            </div>
                        </div>
                      </div>

                      <div className="col-md-8">
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label">
                            標題
                          </label>
                          <input
                            name="title"
                            id="title"
                            type="text"
                            className="form-control"
                            placeholder="請輸入標題"
                            value={productContent.title}
                            onChange={modalInputChange}
                          />
                        </div>

                        <div className="mb-3">
                          <label htmlFor="category" className="form-label">
                            分類
                          </label>
                          <input
                            name="category"
                            id="category"
                            type="text"
                            className="form-control"
                            placeholder="請輸入分類"
                            onChange={modalInputChange}
                            value={productContent.category}
                          />
                        </div>

                        <div className="mb-3">
                          <label htmlFor="unit" className="form-label">
                            單位
                          </label>
                          <input
                            name="unit"
                            id="unit"
                            type="text"
                            className="form-control"
                            placeholder="請輸入單位"
                            onChange={modalInputChange}
                            value={productContent.unit}
                          />
                        </div>

                        <div className="row g-3 mb-3">
                          <div className="col-6">
                            <label htmlFor="origin_price" className="form-label">
                              原價
                            </label>
                            <input
                              name="origin_price"
                              id="origin_price"
                              type="number"
                              className="form-control"
                              placeholder="請輸入原價"
                              onChange={modalInputChange}
                              value={productContent.origin_price}
                            />
                          </div>
                          <div className="col-6">
                            <label htmlFor="price" className="form-label">
                              售價
                            </label>
                            <input
                              name="price"
                              id="price"
                              type="number"
                              className="form-control"
                              placeholder="請輸入售價"
                              onChange={modalInputChange}
                              value={productContent.price}
                            />
                          </div>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="description" className="form-label">
                            產品描述
                          </label>
                          <textarea
                            name="description"
                            id="description"
                            className="form-control"
                            rows={4}
                            placeholder="請輸入產品描述"
                            onChange={modalInputChange}
                            value={productContent.description}
                          ></textarea>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="content" className="form-label">
                            說明內容
                          </label>
                          <textarea
                            name="content"
                            id="content"
                            className="form-control"
                            rows={4}
                            placeholder="請輸入說明內容"
                            onChange={modalInputChange}
                            value={productContent.content}
                          ></textarea>
                        </div>

                        <div className="form-check">
                          <input
                            name="is_enabled"
                            type="checkbox"
                            className="form-check-input"
                            id="isEnabled"
                            onChange={modalInputChange}
                            checked={productContent.is_enabled}
                          />
                          <label className="form-check-label" htmlFor="isEnabled">
                            是否啟用
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer border-top bg-light">
                    <button type="button" className="btn btn-secondary" onClick={handleCloseProductModal}>
                      取消
                    </button>
                    <button type="button" className="btn btn-primary">
                      確認
                    </button>
                  </div>
                </div>
              </div>
            </div>
            { isAdmin ? (<><button className='btn btn-success mb-3 me-2' onClick={backEnd}>{isBackEnd.status ? '產品頁面' : '後台頁面'}</button>
            {/* <button className='btn btn-danger mb-3' onClick={loginCheck}>檢查登入狀態</button> */}
            <div className="row">
            <div className='col col'>
              <div className='d-flex justify-content-between'>
              <h1 className='fw-bold'>產品列表</h1><button className='btn btn-primary' onClick={()=>{handleOpenProductModal('add')}} style={{display:`${isBackEnd.display}`}}>加入新產品</button></div>
        <table className="table">
  <thead>
    <tr>
      <th scope="col">產品名稱</th>
      <th scope="col">原價</th>
      <th scope="col">售價</th>
      <th scope="col">是否啟用</th>
      {/* <th scope="col">查看細節</th> */}
    </tr>
  </thead>
  <tbody>
    {products.map(function(item){
     return(<tr key={item.id}>
      <th scope="row">{item.title}</th>
      <td>{item.origin_price}</td>
      <td>{item.price}</td>
      <td>{item.is_enabled ? '已啟用':'未啟用'}</td>
      {/* <td><button className='btn btn-primary btn-sm' onClick={()=>setDetail(item)}>查看細節</button></td> */}
      <div className="btn-group">
      <button className='btn btn-primary btn-sm' style={{display:`${isBackEnd.display}`}} onClick={function() {
        handleOpenProductModal('edit',item);
      }}>編輯</button><button className='btn btn-danger btn-sm' style={{display:`${isBackEnd.display}`}}>刪除</button></div>
    </tr>)
    })}
  </tbody>
</table></div>
  
 {/* <div className='col col-4'>        
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
          </div>          */}
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
