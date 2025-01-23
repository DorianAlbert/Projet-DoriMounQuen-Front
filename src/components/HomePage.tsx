import RequireAuthentication from '../contexts/RequireAuthentication'
import SelectedCountryProvider from '../contexts/SelectedCountryProvider'
import Earth from './Earth'
import SidePanel from './SidePanel'

export default function HomePage() {
  return (
    <div className="homepage">
      <SelectedCountryProvider>
        <Earth />
        <RequireAuthentication>
          <SidePanel />
        </RequireAuthentication>
      </SelectedCountryProvider>
    </div>
  )
}
