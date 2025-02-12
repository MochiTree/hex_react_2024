function Pagination(props){
 return (<>
    <div className="d-flex justify-content-center">
    <nav>
      <ul className="pagination">
        <li className={`page-item ${!props.pageStatus.has_pre && 'disabled'}`}>
          <button className="page-link" type='button' onClick={()=>props.changePage(props.pageStatus.current_page-1)}>
            上一頁
          </button>
        </li>
        {Array.from({length:props.pageStatus.total_pages}).map(function(item,index){
          return (<li key={index} className={`page-item ${props.pageStatus.current_page=== index+1 && 'active'}`}>
            <button className="page-link" type='button' onClick={()=>props.changePage(index+1)}>
              {index+1}
            </button>
          </li>)
        })}
        
        
        <li className={`page-item ${!props.pageStatus.has_next && 'disabled'}`}>
          <button className="page-link" href="#" onClick={()=>props.changePage(props.pageStatus.current_page+1)}>
            下一頁
          </button>
        </li>
      </ul>
    </nav>
    </div>
 </>)
}


export default Pagination