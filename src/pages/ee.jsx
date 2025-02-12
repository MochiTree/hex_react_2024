// import { useState,useEffect,useRef } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import {Modal} from 'bootstrap';
// import Pagination from '../components/Pagination';
// import ProductModal from '../components/ProductModal';
// import DelProductModal from '../components/DelProductModal';
// import ProductPage from './ProductPage';
// import TopBar from '../components/TopBar';
// import CartPage from './CartPage';
// import ReactLoading from 'react-loading';


// function MainPage(props) {
//   const [productDetail, setDetail] = useState(null);//產品頁面:產品細節用
//   const [products, setProducts] = useState([]);
//   const [isLoading,setIsLoading]=useState(true);
//   const [pageStatus, setPageStatus] = useState({});
//   const [isCart,setIsCart]=useState(false);
//   const [isBackEnd, setIsBackEnd] = useState({
//     display:'none',
//     status:false,
//     displayFront:'block',
//   });
//   const [modalMode, setModalMode]=useState(null);
//   const [isOpen,setIsOpen]=useState(false);
//   const [isDelOpen,setDelIsOpen]=useState(false);


//   // const modalRefMethod = useRef(null);
//   const defaultModalState = {
//     imageUrl: "",
//     title: "",
//     category: "",
//     unit: "",
//     origin_price: "",
//     price: "",
//     description: "",
//     content: "",
//     is_enabled: 0,
//     imagesUrl: [""]
//   };
//   const [productContent, setContent]=useState(defaultModalState);//後台頁面:編輯/新增用
  
//           // 透過 Modal.getInstance(ref) 取得實例
//           function handleOpenProductModal(mode,currentItem) {
        
//             // 從不同按鈕開啟modal 使用編輯/新增
//             setModalMode(mode);
//             // (編輯mode下) 之前axios get的產品資料已經用跑map取得，可取得每個item的值來顯示，若是新增mode 則不顯示
//             switch (mode){
//             case 'edit':
//                 setContent(currentItem);
//                 break;
//             case 'add':
//                 setContent(defaultModalState);
//                 break;
//             default:
//                 break;
//             }
        
//             setIsOpen(true);
//             }


            
//           function handleOpenDelProductModal(item) {
//             setContent(item)
//             setDelIsOpen(true);
//           }   
  

  

//   //取得產品資料，除了初次登入(login)，驗證登入(loginCheck)也可取得資料(同時設定分頁預設值(預設第一頁)
//   async function getProducts(page=1) {
//     setIsLoading(true)
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/admin/products?page=${page}`);
//       setProducts(res.data.products);
//       setPageStatus(res.data.pagination);
//     } catch (err) {
//       // alert(err.message);
//     }finally{
//       setIsLoading(false)
//     }
//   };

//   //預設瀏覽頁面為第一頁(page=1)
//   function changePage(nowPage){
//     getProducts(nowPage);
//   }
 


//   async function addCart(item){
//     try {
//       await axios.post(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/cart`,{
//         data:{
//           product_id:item.id,
//           qty:Number(1),
//         }
//       });
//       alert("已加入購物車");
//     }
//     catch(err){alert(err)}
// }
  
//   //箭頭函式寫法
//   // const loginCheck = async() =>{
//   //   try{
//   //     await axios.post(`${import.meta.env.VITE_BASE_URL}/v2/api/user/check`)
//   //     alert('已登入')
//   //   }catch(err) {
//   //     alert(err.message)
//   //     setIsAdmin(false)
//   //   }
//   // }

//   //初始化時將資料傳入
//     useEffect(()=>{
//       getProducts()
//     },[]);

//   function backEnd(){
//     setIsCart(false);
//     if(isBackEnd.status===true){
//       setIsBackEnd({
//         display:'none',
//         status:!isBackEnd.status,
//         displayFront:'inline-block'
//       });
//     }else if(isBackEnd.status===false) {
//       setIsBackEnd({
//         display:'inline-block',
//         status:!isBackEnd.status,
//         displayFront:'none'
//       });
//     };
//   };
//  function toCartPage(){
//   setIsCart(true);
//  }
//   return (
//     <>
//      {/* <div className="modal fade" ref={modalRef} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//             <div className="modal-dialog">
//                 <div className="modal-content">
//                 <div className="modal-header">
//                     <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
//                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                 </div>
//                 <div className="modal-body">
//                     ...
//                 </div>
//                 <div className="modal-footer">
//                     <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
//                     <button type="button" className="btn btn-primary">新增</button>
//                 </div>
//                 </div>
//             </div>
//             </div>  */}

//               <TopBar backEnd={backEnd} isBackEnd={isBackEnd} toCartPage={toCartPage}></TopBar>
//               <ProductModal modalMode={modalMode} productContent={productContent} isOpen={isOpen} setIsOpen={setIsOpen} setContent={setContent} getProducts={getProducts}></ProductModal>
//               <DelProductModal getProducts={getProducts} productContent={productContent} isDelOpen={isDelOpen} setDelIsOpen={setDelIsOpen} setContent={setContent}></DelProductModal>
//               {isCart ? <CartPage isLoading={isLoading} setIsLoading={setIsLoading}></CartPage> : 
//            <>
//            {/* <button className='btn btn-success mb-3 me-2' onClick={backEnd}>{isBackEnd.status ? '產品頁面' : '後台頁面'}</button> */}
//             {/* <button className='btn btn-danger mb-3' onClick={loginCheck}>檢查登入狀態</button> */}
//             <div className="row">
//             <div className='col col'>
//               <div className='d-flex justify-content-between'>
//               <h1 className='fw-bold'>產品列表</h1><button className='btn btn-primary' onClick={()=>{handleOpenProductModal('add')}} style={{display:`${isBackEnd.display}`}}>加入新產品</button></div>
//         <table className="table">
//   <thead>
//     <tr>
//       <th scope="col">產品名稱</th>
//       <th scope="col">原價</th>
//       <th scope="col">售價</th>
//       <th scope="col" style={{display:`${isBackEnd.display}`}}>是否啟用</th>
//       <th scope="col" style={{display:`${isBackEnd.displayFront}`}}>查看細節</th>
//     </tr>
//   </thead>
//   <tbody>
//     {products.map(function(item){
//      return(<tr key={item.id}>
//       <th scope="row">{item.title}</th>
//       <td>{item.origin_price}</td>
//       <td>{item.price}</td>
//       <td style={{display:`${isBackEnd.display}`}}>{item.is_enabled ? <span className='text-success'>已啟用</span>: <span>未啟用</span>}</td>
//       <td><button className='btn btn-primary btn-sm' onClick={()=>setDetail(item)} style={{display:`${isBackEnd.displayFront}`}}>查看細節</button></td>
//       <td><button className='btn btn-warning btn-sm' style={{display:`${isBackEnd.displayFront}`}} onClick={()=>addCart(item)}>加入購物車</button></td>
//       <div className="btn-group">
//       <button className='btn btn-primary btn-sm' style={{display:`${isBackEnd.display}`}} onClick={function() {
//         handleOpenProductModal('edit',item);
//       }}>編輯</button><button className='btn btn-danger btn-sm' style={{display:`${isBackEnd.display}`}} onClick={()=>handleOpenDelProductModal(item)}>刪除</button></div>
//     </tr>)
//     })}
//   </tbody>
// </table>
//       <Pagination pageStatus={pageStatus} changePage={changePage}></Pagination>
// </div>
// <div className='col col-4' style={{display:`${isBackEnd.displayFront}`}}>         
// <h1 className='fw-bold'>單一產品細節</h1>
//           {productDetail ? <ProductPage productDetail={productDetail} function={addCart}></ProductPage> : <span className='text-muted'>請點選欲觀看產品之細節</span>}
//           </div>      
//           {isLoading && <div className='d-flex justify-content-center align-items-center'
//                         style={{backgroundColor:'rgba(205, 233, 202, 0.4)',position:'fixed',top:0,left:0,right:0,bottom:0}}>
//                         <ReactLoading type={'spin'} color={'#000'} height={'3rem'} width={'3rem'} />
//                         </div>}
//           </div></>}
//     </>
//   )
// }

// export default MainPage;
