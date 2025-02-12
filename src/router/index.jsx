import {createHashRouter} from 'react-router-dom';
import FrontBar from '../layouts/FrontBar';
import HomePage from '../pages/HomePage';

const index=createHashRouter([
    {
        path:'/',
        element: <FrontBar></FrontBar>,
        children:[
            {
                path:'',
                element: <HomePage/>,
            }
        ]
    }
])

export default index;