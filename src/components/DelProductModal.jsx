import {useEffect,useRef } from 'react';
import axios from 'axios';
import {Modal} from 'bootstrap';

function DelProductModal(props) {
    const delModalRef=useRef(null);
    useEffect(()=>{
        new Modal(delModalRef.current);

      },[])
      useEffect(()=>{
        if(props.isDelOpen){
        const modalInstance = Modal.getInstance(delModalRef.current);
        modalInstance.show();}
    },[props.isDelOpen])
    
  function handleCloseDelProductModal() {
    const modalInstance = Modal.getInstance(delModalRef.current);
    modalInstance.hide();
    props.setDelIsOpen(false);
  }
  async function deleteProduct(){
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/admin/product/${props.productContent.id}`)
    }catch(err){ alert('刪除失敗',err.message) }
  }

  async function handleDeleteProduct(){
    try {
      await deleteProduct();
      props.getProducts();
      handleCloseDelProductModal();
    }catch(err){alert('發生錯誤')}
  }
    return (
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
                      <span className="text-danger fw-bold">{props.productContent.title}</span>
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
    )
}

export default DelProductModal