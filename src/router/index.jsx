import {createHashRouter} from 'react-router-dom';
import FrontBar from '../layouts/FrontBar';
import HomePage from '../pages/HomePage';
// import App from '../App'
import LoginPage from '../pages/LoginPage';
import CartPage from '../pages/CartPage';
import MainPage from '../pages/MainPage';
import BackEndPage from '../pages/BackEndPage';

const index=createHashRouter([
    {
        path:'/',
        element: <FrontBar></FrontBar>,
        children:[
            {
                path:'',
                element: <HomePage></HomePage>
            },
            {
                path:'product',
                element: <MainPage></MainPage>
            },
            {
                path:'cart',
                element: <CartPage></CartPage>
            },
            {
                path:'login',
                element:<LoginPage></LoginPage>
            },
            {
                path:'backend',
                element:<BackEndPage></BackEndPage>
            }
        ]
    }
])

export default index;