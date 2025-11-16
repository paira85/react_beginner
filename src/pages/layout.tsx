
import userAuthListener from '@/components/hooks/user-auth'
import { AppFooter, AppHeader } from '../components/common'
import { Outlet } from 'react-router'

export default function layout() {
  userAuthListener()
  return (
    <div className="page">
        <AppHeader />
        <div className="container">
          <Outlet />
        </div>
        <AppFooter />
      </div>
  )
}
