import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { useLazyGetMeQuery } from './redux/api/auth.api'
import { logout, setAuthLoading, setUser } from './redux/features/auth/authSlice'
import { useAppDispatch } from './redux/hooks'
import { generateRoutes } from './routes'

function AppRoutes() {
  const { isAuthenticated } = useAuth()

  const routes = generateRoutes(isAuthenticated)
  const element = useRoutes(routes)

  return element
}

export default function App() {
  const dispatch = useAppDispatch()
  const [triggerGetMe] = useLazyGetMeQuery()

  useEffect(() => {
    (async () => {
      try {
        const result = await triggerGetMe(undefined).unwrap()
        dispatch(setUser(result.data))
      } catch {

        dispatch((_dispatch, getState) => {
          if (!getState().auth.user) {
            dispatch(logout())
          }
        })
      } finally {
        dispatch(setAuthLoading(false))
      }
    })()
  }, [dispatch, triggerGetMe])

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"

      />
      <AppRoutes />
    </BrowserRouter>
  )
}