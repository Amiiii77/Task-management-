import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
    const[username,setUsername]=useState('')
    const[password,setPassword]=useState('')
    const handlesignup=()=>{
        axios.post(`http://localhost:3001/users`,
        {"username":username,"password":password})
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
        
    }
  return (
    <div>
      <div className='container'>
      <div className='Signup'>
      <form onSubmit={handlesignup}>
        <h1>Signup</h1><br></br><br></br>
      <label>Username:</label>
      <input type='text' value={username} onChange={(e)=>{setUsername(e.target.value)}}/><br></br><br></br>
      <label>Password:</label>
      <input type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/><br></br><br></br>
      <button type='submit'>SignUp</button><br></br><br></br>
      <Link to='/login'>Already have an account?Login</Link>
      <br></br><br></br>
      </form>
      </div>
    </div>
    </div>
  )
}
export default Signup


