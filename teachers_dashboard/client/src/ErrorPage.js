import React from 'react'
import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {

  // useRouteError hook to get the error object
  const error = useRouteError()

  return (
    <div className='bg-warning text-center mt-5 p-5'>
      <h1 className='text-danger'>{error.status} -- {error.data}</h1>
    </div>
  )
}
