import {createHashRouter} from 'react-router-dom';

const index=createHashRouter([
    {
        path:'/',
        element: <h1>首頁</h1>
    }
])

export default index;