import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './App.css'

export default function SignUp() {
  let { register, handleSubmit, formState: { errors } } = useForm()
  let [err, setErr] = useState("")
  let navigate = useNavigate()
  async function handleFormSubmit(Obj) {
    Obj.exams = []
    let res = await axios.post("http://localhost:5300/register", Obj)
    if (res.status !== 201)
      setErr(res.data.message)
    navigate('/')
  }

  return (
    <>
      <h1 className='text-center text-success display-5 mt-3'>Malpractice detection in Lab exams</h1>
      <div className='row mx-auto w-50 bg-right mt-4 rounded text-white' style={{ minHeight: "400px" }}>
        <div className='col-6 rounded-end-circle bg-left justify-content-center align-items-center d-flex flex-column'>
          <h1 className='text-center mb-4' style={{ color: '#FFD23F' }}>Already Registered?</h1>
          <Link to='/' className='link-info fs-5'>Login</Link>
        </div>
        <div className='col-6 p-0'>
          <form className='container p-4 mt-5' onSubmit={handleSubmit(handleFormSubmit)}>
            <h1 className='text-center mb-2'>Register</h1>
            {err.length !== 0 && <p className='text-success mb-0 text-center'>{err}</p>}
            {errors.username?.type === 'required' && (<p className='text-danger m-0 d-inline me-1'>*</p>)}
            <label className='form-label mb-0'>Lab Number</label>
            <input type='text' className='form-control w-100 mb-3' {...register('labnumber', { required: true })} />
            {errors.password?.type === 'required' && (<p className='text-danger m-0 d-inline me-1'>*</p>)}
            <label className='form-label mb-0'>Password</label>
            <input type='password' className='form-control w-100 mb-3' {...register('password', { required: true })} />
            <button className='btn-success mt-3 btn'>Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}