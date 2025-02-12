import {createHashRouter} from 'react-router-dom';
import FrontBar from '../layouts/FrontBar';
import HomePage from '../pages/HomePage';
import App from '../App'

const index=createHashRouter([
    {
        path:'/',
        element: <FrontBar></FrontBar>,
        children:[
            {
                path:'',
                element: <HomePage/>,
            },
            {
                path:'product',
                element: <App></App>
            }
        ]
    }
])

export default index;