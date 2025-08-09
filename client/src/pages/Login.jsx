import React, {useContext, useState} from 'react'
import assets from "../assets/assets.js"
import {useNavigate} from "react-router-dom"
import { AppContent } from '../context/AppContext.jsx';
import axios from "axios"
import { toast } from 'react-toastify';
const Login = () => {

    const navigate = useNavigate();

    const {backendUrl, setIsLoggedIn} = useContext(AppContent);

    const [state, setState] = useState('Sign Up')
    const [fullname, setfullname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
      try {
        e.preventDefault();
        axios.defaults.withCredentials=true
        if(state==='Sign Up'){
          const {data} = await axios.post(backendUrl + "/api/auth/register", {fullname, username, email, password})

          if(data.success){
            setIsLoggedIn(true)
            navigate("/")
          }else{
            toast.error(data.message)
          }
        }else{
          const {data} = await axios.post(backendUrl + "/api/auth/login", {email, password})

          if(data.success){
            setIsLoggedIn(true)
            navigate("/")
          }else{
            toast.error(data.message)
          }
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-white to-[#B89F73]'>
        <div className='bg-white p-10 rounded-3xl shadow-xl w-full sm:w-96 text-indig-300 text-sm'>
            <h2 className='text-3xl font-semibold text-[--gold] text-center mb-3'>{state==='Sign Up' ? 'Create account' : 'Login'}</h2>
            <p className='text-center text-sm mb-6 text-gray-400'>{state==='Sign Up' ? 'Create your account' : 'Login to your account'}</p>
            <form onSubmit={onSubmitHandler}>
              {
                state==='Sign Up' && (
              <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#b46e23]'>
                <img src={assets.person_icon} alt="" />
                <input onChange={e => setfullname(e.target.value)} value={fullname} className='bg-transparent outline-none placeholder:text-[#c6c6c6]' type="text" placeholder="Full Name" required/>
              </div>    
              )
              }
              {
                state==='Sign Up' && (
              <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#b46e23]'>
                <img src={assets.person_icon} alt="" />
                <input onChange={e => setUsername(e.target.value)} value={username} className='bg-transparent outline-none placeholder:text-[#c6c6c6]' type="text" placeholder="Username" required/>
              </div>
              )
              }
              
              <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#b46e23]'>
                <img src={assets.mail_icon} alt="" />
                <input onChange={e => setEmail(e.target.value)}
                value={email} className='bg-transparent outline-none placeholder:text-[#c6c6c6]' type="email" placeholder="Email" required/>
              </div>
              <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#b46e23]'>
                <img src={assets.lock_icon} alt="" />
                <input onChange={e => setPassword(e.target.value)} 
               value={password} className='bg-transparent outline-none placeholder:text-[#c6c6c6]' type="password" placeholder="Password" required/>
              </div>

              <p onClick={()=>navigate('/reset-password')} className='mb-5 text-[#b46e23] cursor-pointer'>Forgot password?</p>

              <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-[#b46e23] to-[#7e4609] text-white font-medium'>
                {state==='Sign Up' ? 'Sign Up' : 'Login'}
              </button>
            </form>

            {state==='Sign Up' ? (
            <p className='text-gray-400 text-center text-xs mt-4'>Already have an account?{' '}
              <span onClick={()=> setState('Login')} className='text-blue-400 cursor-pointer underline'>Login here</span>
            </p>):(
            <p className='text-gray-400 text-center text-xs mt-4'>Don't have an account?{' '}
              <span onClick={()=> setState("Sign Up")} className='text-blue-400 cursor-pointer underline'>Sign Up</span>
            </p>)}
            
            
        </div>
    </div>
  )
}

export default Login