import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ROUTES } from 'src/routes/config'
import { AuthGuard } from './AuthGuard'

export const AppRoutes = () => {
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
