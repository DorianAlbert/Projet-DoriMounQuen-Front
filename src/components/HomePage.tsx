import RequireAuthentication from '../contexts/RequireAuthentication'
import SelectedCountryProvider from '../contexts/SelectedCountryProvider'
import Earth from './Earth'
import SidePanel from './SidePanel'
import Profile from './Profile.tsx'

export default function HomePage() {
  return (
    <div className="homepage">
      <SelectedCountryProvider>
        <Earth />
        <RequireAuthentication>
          <>
            <SidePanel />
            <Profile />
          </>
        </RequireAuthentication>
      </SelectedCountryProvider>
    </div>
  )
}
