import { useState,useEffect,useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal} from 'bootstrap';
import Pagination from '../components/Pagination';
import ProductModal from '../components/ProductModal';


function MainPage(props) {
  const [productDetail, setDetail] = useState(null);//產品頁面:產品細節用
  const [products, setProducts] = useState([]);
  const [pageStatus, setPageStatus] = useState({});
  const [isBackEnd, setIsBackEnd] = useState({
    display:'none',
    status:false,
  });
  const [modalMode, setModalMode]=useState(null);
  const [isOpen,setIsOpen]=useState(false);

  const delModalRef=useRef(null);
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
        
            setIsOpen(true);
            }

  useEffect(()=>{

    
    new Modal(delModalRef.current);

    //從cookie抓出token，讓每次使用axios的時候把token放入header傳送
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1",
    );
    axios.defaults.headers.common['Authorization'] = token;
    // loginCheck();
  },[])



  
  function handleOpenDelProductModal(item) {
    setContent(item)
    const modalInstance = Modal.getInstance(delModalRef.current);
    modalInstance.show();
  }

  function handleCloseDelProductModal() {
    const modalInstance = Modal.getInstance(delModalRef.current);
    modalInstance.hide();
  }


  //取得產品資料，除了初次登入(login)，驗證登入(loginCheck)也可取得資料(同時設定分頁預設值(預設第一頁)
  async function getProducts(page=1) {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/admin/products?page=${page}`);
      setProducts(res.data.products);
      setPageStatus(res.data.pagination);
    } catch (err) {
      // alert(err.message);
    }
  };

  //預設瀏覽頁面為第一頁(page=1)
  function changePage(nowPage){
    getProducts(nowPage);
  }
 


  async function deleteProduct(){
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/admin/product/${productContent.id}`)
    }catch(err){ alert('刪除失敗',err.message) }
  }

  async function handleDeleteProduct(){
    try {
      await deleteProduct();
      getProducts();
      handleCloseDelProductModal();
    }catch(err){alert('發生錯誤')}
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

  //初始化時將資料傳入
    useEffect(()=>{
      getProducts()
    },[]);


  function backEnd(){
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
              <ProductModal modalMode={modalMode} productContent={productContent} isOpen={isOpen} setIsOpen={setIsOpen} setContent={setContent} getProducts={getProducts}></ProductModal>
              <div
                className="modal fade"
                ref={delModalRef}
                id="delProductModal"
                tabIndex="-1"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5">刪除產品</h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={handleCloseDelProductModal}
                      ></button>
                    </div>
                    <div className="modal-body">
                      你是否要刪除 
                      <span className="text-danger fw-bold">{productContent.title}</span>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCloseDelProductModal}
                      >
                        取消
                      </button>
                      <button type="button" className="btn btn-danger" onClick={handleDeleteProduct}>
                        刪除
                      </button>
                    </div>
                  </div>
                </div>
              </div>
           <><button className='btn btn-success mb-3 me-2' onClick={backEnd}>{isBackEnd.status ? '產品頁面' : '後台頁面'}</button>
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
      <td>{item.is_enabled ? <span className='text-success'>已啟用</span>: <span>未啟用</span>}</td>
      {/* <td><button className='btn btn-primary btn-sm' onClick={()=>setDetail(item)}>查看細節</button></td> */}
      <div className="btn-group">
      <button className='btn btn-primary btn-sm' style={{display:`${isBackEnd.display}`}} onClick={function() {
        handleOpenProductModal('edit',item);
      }}>編輯</button><button className='btn btn-danger btn-sm' style={{display:`${isBackEnd.display}`}} onClick={()=>handleOpenDelProductModal(item)}>刪除</button></div>
    </tr>)
    })}
  </tbody>
</table>
      <Pagination pageStatus={pageStatus} changePage={changePage}></Pagination>
</div>
</div></>
    </>
  )
}

export default MainPage;
