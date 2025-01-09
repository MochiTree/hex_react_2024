import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [isAdmin, setIsAdmin]=useState(false);

  const [account,setAccount]=useState({
    username:'請輸入信箱',
    password:'請輸入密碼',
  })

  function updateEnter(e){

    setAccount({
      ...account,
      [e.target.name]:e.target.value,
    })
  }

  function login(e){
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_BASE_URL}/v2/admin/signin`,account)
    .then((res) => {
      alert(res.data.message);
      const {token, expired} = res.data;
      document.cookie = `loginToken=${token}; expires=${new Date(expired)}`;
      setIsAdmin(true);
    })
    .catch((err) => alert('登入失敗  '+err.message))
  }

  return (
    <>
    {isAdmin ? <h1>ok</h1> : <><h2 className='mb-5 display-2 fw-bold'>登入</h2><form>
        <div className="form-group mb-3">
          <label htmlFor="email" className='pb-2'>Email</label>
          <input type="email" name='username' className="form-control form-control-lg" id="email" onChange={updateEnter} />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password" className='pb-2'>密碼</label>
          <input type="password" name='password' className="form-control form-control-lg" id="password" onChange={updateEnter} />
        </div>
        <button onClick={login} type="submit" className="btn btn-primary">登入</button>
      </form></>}
      {/* <h2 className='mb-5 display-2 fw-bold'>登入</h2>
      <form>
        <div className="form-group mb-3">
          <label htmlFor="email" className='pb-2'>Email</label>
          <input type="email" name='username' className="form-control form-control-lg" id="email" onChange={updateEnter}/>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password" className='pb-2'>密碼</label>
          <input type="password" name='password' className="form-control form-control-lg" id="password" onChange={updateEnter}/>
        </div>
          <button onClick={login} type="submit" className="btn btn-primary">登入</button>
      </form> */}
    </>
  )
}

export default App
