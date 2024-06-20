import React from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import RootLayout from './RootLayout'
import Dashboard from './Dashboard'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './ErrorPage'
import Room from './Room'

function App() {
  let data = createBrowserRouter([
    {
      path: '',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '',
          element: <SignIn />
        },
        {
          path: 'signup',
          element: <SignUp />
        },
        {
          path: 'dashboard/:labnumber',
          element: <Dashboard />,
        },
        {
          path: 'room/:code',
          element: <Room />
        }
      ]
    }
  ])

  return (
    <div>
      <RouterProvider router={data} />
    </div>
  )
}

export default App