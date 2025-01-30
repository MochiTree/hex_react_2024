import 'bootstrap/dist/css/bootstrap.min.css';
function TopBar(props){
    return <>
    <div>
      <div className="d-flex bg-success my-3">
        <a href='#1' className='text-light link-dark-hover p-3 text-decoration-none' onClick={props.backEnd}>{props.isBackEnd.status ? '產品頁面' : '後台頁面'}</a>
        <a href='#2' className='text-light p-3 text-decoration-none'>購物車</a>
      </div>
    </div>
    </>
}

export default TopBar;