import {createHashRouter} from 'react-router-dom';
import FrontBar from '../layouts/FrontBar';
// import HomePage from '../pages/HomePage';
import App from '../App'
import LoginPage from '../pages/LoginPage';

const index=createHashRouter([
    {
        path:'/',
        element: <FrontBar></FrontBar>,
        children:[
            {
                path:'',
                element: <LoginPage></LoginPage>
            },
            {
                path:'product',
                element: <App></App>
            }
        ]
    }
])

export default index;