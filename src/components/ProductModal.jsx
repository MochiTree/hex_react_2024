import {useEffect,useRef } from 'react';
import axios from 'axios';
import {Modal} from 'bootstrap';
function ProductModal(props) {
      const modalRef =useRef(null);
        
        useEffect(()=>{

            
            new Modal(modalRef.current);
        },[])

        useEffect(()=>{
            if(props.isOpen){
            const modalInstance = Modal.getInstance(modalRef.current);
            modalInstance.show();}
        },[props.isOpen])

            function handleCloseProductModal() {
            const modalInstance = Modal.getInstance(modalRef.current);
            modalInstance.hide();
            props.setIsOpen(false);
            }

            function modalInputChange(e) {
                const {name,value,type,checked} = e.target
                props.setContent({
                  ...props.productContent,
                  [name]: type==='checkbox' ? checked : value,
                })
              }
            
              //當副圖input更改時:找出哪一個input更改，並更新該index之item值
              function changeSubImages(e,index){
                const {value} = e.target;
                const newImages = [...props.productContent.imagesUrl];
                newImages[index]=value;
            
                props.setContent({
                  ...props.productContent,
                  imagesUrl:newImages,
                })
              }
              function addImages() {
                const imagesList = [...props.productContent.imagesUrl,''];
                props.setContent({
                  ...props.productContent,
                  imagesUrl:imagesList,
                })
              }
            
              function removeImgaes() {
                const imagesList = [...props.productContent.imagesUrl];
                imagesList.pop();
                props.setContent({
                  ...props.productContent,
                  imagesUrl:imagesList,
                })
              }
              async function addProduct(){
                try {
                  await axios.post(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/admin/product`,
                    {
                      data:{
                        ...props.productContent,
                        origin_price:+(props.productContent.origin_price),
                        price:+(props.productContent.price),
                        is_enabled:props.productContent.is_enabled ? 1 : 0,
                    }})}
                    catch(err){ alert('新增失敗',err.message) }
              }
              async function updateProduct(){
                try {
                  await axios.put(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/admin/product/${props.productContent.id}`,
                    {
                      data:{
                        ...props.productContent,
                        origin_price:+(props.productContent.origin_price),
                        price:+(props.productContent.price),
                        is_enabled:props.productContent.is_enabled ? 1 : 0,
                    }})}
                    catch(err){ alert('更新失敗',err.message) }
              }
              //點擊新增(addProduct)後 先post到api 再從api把結果撈回來渲染(getProducts)
                async function reRenderProduct(){
                    const whichApi = props.modalMode==='edit' ? updateProduct : addProduct;
                try {
                    await whichApi();
                    props.getProducts();
                    handleCloseProductModal();
                }catch(err){
                    alert('更新失敗',err.message)
                }
            }

    return(<div id="productModal" ref={modalRef} className="modal fade" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-bottom">
              <h5 className="modal-title fs-4">{props.modalMode==='edit' ? '編輯產品' : '新增產品'}</h5>
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
                        value={props.productContent.imageUrl}
                      />
                    </div>
                    <img
                      src={props.productContent.imageUrl}
                      alt=""
                      className="img-fluid"
                    />
                  </div>

                  {/* 副圖 */}
                  <div className="border border-2 border-dashed rounded-3 p-3">
                    {props.productContent.imagesUrl?.map((image, index) => (
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
                        {props.productContent.imagesUrl.length <5 && props.productContent.imagesUrl[(props.productContent.imagesUrl.length)-1] !=='' && <button className="btn btn-outline-primary btn-sm w-100" onClick={addImages}>新增圖片</button>}

                        {props.productContent.imagesUrl.length >1 && <button className="btn btn-outline-danger btn-sm w-100" onClick={removeImgaes}>取消圖片</button>}
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
                      value={props.productContent.title}
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
                      value={props.productContent.category}
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
                      value={props.productContent.unit}
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
                        value={props.productContent.origin_price}
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
                        value={props.productContent.price}
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
                      value={props.productContent.description}
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
                      value={props.productContent.content}
                    ></textarea>
                  </div>

                  <div className="form-check">
                    <input
                      name="is_enabled"
                      type="checkbox"
                      className="form-check-input"
                      id="isEnabled"
                      onChange={modalInputChange}
                      checked={props.productContent.is_enabled}
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
              <button type="button" className="btn btn-primary" onClick={reRenderProduct}>
                確認
              </button>
            </div>
          </div>
        </div>
      </div>)
}

export default ProductModal