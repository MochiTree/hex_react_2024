function ProductPage(props){       
    return   <><div className="card mb-3">
    <img src={props.productDetail.imageUrl} className="card-img-top primary-image"/>
    <div className="card-body">
      <h5 className="card-title fw-bold">
        {props.productDetail.title}
        <span className="badge bg-primary ms-2">{props.productDetail.category}</span><button className='btn btn-warning btn-sm ms-2'onClick={()=>props.function(props.productDetail)}>加入購物車</button>
      </h5>
      <p className="card-text">商品描述：{props.productDetail.description}</p>
      <p className="card-text">商品內容：{props.productDetail.content}</p>
      <div className="d-flex">
        <p className="card-text text-secondary"><del>{props.productDetail.origin_price}</del></p>
        元 / {props.productDetail.price} 元
      </div>
      <h5 className="mt-3">更多圖片：</h5>
      <div className="d-flex flex-wrap">
        {props.productDetail.imagesUrl.map(function(item,index){
          return <img key={index} src={item} className='img-thumbnail w-25 object-fit-cover'/>
        })}
      </div>
    </div>
  </div></>
}

export default ProductPage;