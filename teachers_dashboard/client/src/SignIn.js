import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import './App.css'
import axios from 'axios'

function SignIn() {
  let { register, handleSubmit, formState: { errors } } = useForm()
  let [errMsg, setErr] = useState("")

  let navigate = useNavigate()
  async function handleFormSubmit(loginObj) {
    console.log(loginObj)
    let res = await axios.post("http://localhost:5300/login", loginObj)
    if (res.data.message === "Login successful") {
      localStorage.setItem("token", res.data.token)
      navigate(`../dashboard/${loginObj.labnumber}`, { state: loginObj })
    }
    else
      setErr(res.data.message)
  }

  return (
    <>
      <h1 className='text-center text-success display-5 mt-3'>Malpractice detection in Lab exams</h1>
      <div className='row mx-auto bg-right text-white w-50 mt-4 rounded' style={{ minHeight: "400px" }}>
        <div className='col-6 p-0'>
          <form className='p-4 mt-5' onSubmit={handleSubmit(handleFormSubmit)}>
            <p className='text-danger mb-0 text-center fs-5'>{errMsg}</p>
            <h1 className='text-center mb-2'>Login</h1>
            {errors.username?.type === 'required' && (<p className='text-danger m-0 d-inline me-1'>*</p>)}
            <label className='form-label mb-0 mt-2'>Lab Number</label>
            <input type='text' className='form-control w-100 mb-3' {...register('labnumber', { required: true })} />
            {errors.password?.type === 'required' && (<p className='text-danger m-0 d-inline me-1'>*</p>)}
            <label className='form-label mb-0'>Password</label>
            <input type='password' className='form-control w-100' {...register('password', { required: true })} />
            {errors.email?.type === 'required' && (<p className='text-danger m-0 d-inline me-1'>*</p>)}
            <button className='btn-success mt-3 btn'>Submit</button>
          </form>
        </div>
        <div className='col-6 rounded-start-circle bg-left justify-content-center align-items-center d-flex flex-column'>
          <h1 className='text-center mb-4' style={{ color: '#FFD23F' }}>Not yet Registered?</h1>
          <Link className='link-info fs-5' to='/signup'>Register</Link>
        </div>
      </div>
    </>
  )
}

export default SignIn