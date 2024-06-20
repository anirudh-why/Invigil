import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { axiosWithToken } from './axiosWithToken'

function Dashboard() {

  let [value, setValue] = useState("")
  let [web, setWeb] = useState([])
  let [err, setErr] = useState("")
  let { register, handleSubmit } = useForm()
  let navigate = useNavigate()
  let { state } = useLocation()
  let [codes, setCodes] = useState([])
  let [flag, setFlag] = useState(0)

  async function getcodes() {
    console.log(state.labnumber)
    let res = await axiosWithToken.get(`http://localhost:5300/labs/${state.labnumber}`)
    console.log(res.data)
    console.log(res.data.payload)
    console.log(res.data.payload[0])
    console.log(res.data.payload[0].exams)
    setCodes(res.data.payload[0].exams)
  }
  useEffect(() => {
    getcodes()
    console.log(codes)
  }, [value])

  async function randomNumberGenerator() {
    let temp = ""
    let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", len = 6, code
    for (let i = 0; i < len; i++)
      temp += chars.charAt(Math.floor(Math.random() * chars.length))
    setValue(temp)
  }

  async function addLogs() {
    let obj = {}
    obj.code = value
    obj.date = new Date()
    let res = await axiosWithToken.put(`http://localhost:5300/code/${state.labnumber}`, obj)
  }

  function AddWebsites(Obj) {
    let str = Obj.content
    const list = str.split("\n");
    setWeb(list)
    addInstance()
    addLogs()
    window.location.reload()
    setFlag(1)
  }

  async function addInstance() {
    let activeObj = {}
    activeObj.code = value
    console.log(activeObj)
    activeObj.date = new Date()
    activeObj.labnumber = state.labnumber
    activeObj.allowedWebsites = web
    activeObj.users = []
    let res = await axiosWithToken.post("http://localhost:5300/instance", activeObj)
    if (res.data.message !== 'New instance created')
      setErr(res.data.message)
  }

  useEffect(() => {
    randomNumberGenerator()
  }, [])

  function getTime(date) {
    let time = new Date(date).getUTCHours()
    if (time > 12)
      return "Afternoon"
    else
      return "Morning"
  }

  function goToRoom(code) {
    navigate(`/room/${code}`, { state: code })
  }

  function ISOtoUTC(iso) {
    let date = new Date(iso).getUTCDate();
    let day = new Date(iso).getUTCDay();
    let year = new Date(iso).getUTCFullYear();
    return `${date}/${day}/${year}`;
  }

  return (
    <div className='container mt-4'>
      {err}
      <h1>Welcome to the dashboard of {state.labnumber}</h1>
      <div className='d-flex justify-content-around'>
        <div className='d-flex flex-column'>
          <h4 className='mt-5'>The generated code for this session </h4>
          <h1 className='p-3 mt-4 text-center' style={{ color: '#EEEEEE', backgroundColor: '#32012F' }}>{value}</h1>
        </div>
        <div className='d-flex flex-column'>
          <h3>Give Allowlist of websites</h3>
          <form onSubmit={handleSubmit(AddWebsites)}>
            <textarea rows={5} className='form-control mb-2' placeholder='Ex :- https://www.kaggle.com/* https://www.programiz.com/*' {...register('content')} />
            <button className='btn btn-warning'>Start Session</button>
          </form>
        </div>
      </div>
      {/* {flag && <h1>Go to the current room <button className='btn btn-info' onClick={() => goToRoom(value)}>Room</button></h1>} */}
      <table className="w-75 mx-auto table-success mt-3 table-striped table-hover table text-center">
        <thead>
          <tr>
            <th>Date of exam</th>
            <th>Code</th>
            <th>Time of exam</th>
            <th>More Info</th>
          </tr>
        </thead>
        <tbody>
          {codes.length > 0 && codes.map((ele, ind) => (
            <tr key={ind}>
              <td>{ISOtoUTC(ele.date)}</td>
              <td>{ele.code}</td>
              <td>{getTime(ele.date)}</td>
              <td><button className='btn btn-danger' onClick={() => goToRoom(ele.code)}>Read More...</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard