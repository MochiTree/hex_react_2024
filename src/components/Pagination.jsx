function Pagination(props){
 return (<>
    <div className="d-flex justify-content-center">
    <nav>
      <ul className="pagination">
        <li className={`page-item ${!props.pageStatus.has_pre && 'disabled'}`}>
          <a className="page-link" href="#" onClick={()=>props.changePage(props.pageStatus.current_page-1)}>
            上一頁
          </a>
        </li>
        {Array.from({length:props.pageStatus.total_pages}).map(function(item,index){
          return (<li key={index} className={`page-item ${props.pageStatus.current_page=== index+1 && 'active'}`}>
            <a className="page-link" href="#" onClick={()=>props.changePage(index+1)}>
              {index+1}
            </a>
          </li>)
        })}
        
        
        <li className={`page-item ${!props.pageStatus.has_next && 'disabled'}`}>
          <a className="page-link" href="#" onClick={()=>props.changePage(props.pageStatus.current_page+1)}>
            下一頁
          </a>
        </li>
      </ul>
    </nav>
    </div>
 </>)
}


export default Pagination