import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ROUTES } from 'src/routes/config'
import { AuthGuard } from './AuthGuard'
import { useStateRedirect } from './useStateRedirect'

export const AppRoutes = () => {
  useStateRedirect()

  return (
    <Routes>
      {ROUTES.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.auth ? (
              <AuthGuard>
                <route.component />
              </AuthGuard>
            ) : (
              <route.component />
            )
          }
        />
      ))}
    </Routes>
  )
}
