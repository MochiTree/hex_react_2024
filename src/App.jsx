import { useState,useEffect } from 'react';
import axios from 'axios';
import './App.css';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

//由App為入口 判斷是否登入，登入後進去主頁面(MainPage)

function App() {
 const [isAdmin,setIsAdmin]=useState(true);
    // 登入驗證，若已經登入的話，token有效時，不用二次登入，同時也可以用getProducts帶入產品資料
    async function loginCheck(){
      try{
        await axios.post(`${import.meta.env.VITE_BASE_URL}/v2/api/user/check`);
        setIsAdmin(true);
      } catch(err) {
        setIsAdmin(false);
      }
    };
    useEffect(()=>{
      loginCheck();
    },[])
 return (
  <>
    {isAdmin ? <MainPage isAdmin={isAdmin} setIsAdmin={setIsAdmin}/> : <LoginPage setIsAdmin={setIsAdmin} isAdmin={isAdmin}></LoginPage>}
  </>
 )
}
export default App
