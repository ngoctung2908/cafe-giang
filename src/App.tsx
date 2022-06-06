import { useEffect } from 'react'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { connectors } from 'utils/web3React'

import { LoginPage } from 'pages/loginPage'
import { HomePage } from 'pages/homePage'
import { NotFound } from 'components/notFound'
import { Layout } from 'components/layout'

export const App = () => {
  const { activate } = useWeb3React()
  useEffect(() => {
    const provider = window.localStorage.getItem('provider')
    if (provider) activate(connectors[provider])
  }, [activate])

  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <AuthGuard>
            <Layout />
          </AuthGuard>
        }
      >
        <Route path="">
          <Route index={true} element={<HomePage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const isLoggedIn = Boolean(localStorage.getItem('access_token'))
  const location = useLocation()

  if (isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
