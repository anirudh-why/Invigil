import React, { useState, useEffect } from 'react'
import { axiosWithToken } from './axiosWithToken'
import { useLocation } from 'react-router-dom'

function Room() {
  const [users, setUsers] = useState([])
  const { state } = useLocation()

  async function getUsers() {
    console.log(state)
    try {
      let res = await axiosWithToken.get(`http://localhost:5300/users/${state}`)
      console.log(res.data)
      console.log(res.data.payload[0].users)
      setUsers(res.data.payload[0].users)
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getUsers()
    }, 500)
    return () => clearInterval(interval)
  }, [])

  function getMalCount(log) {
    let cnt = [0, 0, 0]
    if (log) {
      log.forEach(ele => {
        if (ele.includes("Ctrl"))
          cnt[0]++
        else if (ele.includes("Tab"))
          cnt[1]++
        else if (ele.includes("Full"))
          cnt[2]++
      })
    }
    return cnt
  }

  return (
    <div>
      <h1 className='text-center mt-3'>This room number is <h1 style={{ color: "#32012F" }}>{state}</h1></h1>
      <table className="w-75 mx-auto table-info mt-3 table-striped table-hover table text-center">
        <thead>
          <tr>
            <th>IP Addr</th>
            <th>RollNo.</th>
            <th>Ctrl Keys</th>
            <th>Tab switching</th>
            <th>Full screen</th>
            <th>GeoLocation</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 && users.map((ele, ind) => (
            <tr key={ind}>
              <td>{ele.IPAdd}</td>
              <td>{ele.rollno}</td>
              <td>{getMalCount(ele.logs)[0]}</td>
              <td>{getMalCount(ele.logs)[1]}</td>
              <td>{getMalCount(ele.logs)[2]}</td>
              <td>{ele.loc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Room
