import { NavLink, Outlet } from "react-router-dom"

const paths = [
    { path: "/", name: "首頁" },
    { path: "/product", name: "產品列表" },
    { path: "/cart", name: "購物車" },
  ];

function FrontBar(){
    return (
        <><nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container">
                <ul className="navbar-nav flex-row gap-5 fs-5">
                {
                    paths.map(function(item){
                        return (
                            <><li key={item.path} className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to={item.path}>{item.name}</NavLink>
                            </li></>
                        )
                    })
                }
                </ul>
            </div>
            </nav>
            <Outlet></Outlet>
            </>
    )
}

export default FrontBar