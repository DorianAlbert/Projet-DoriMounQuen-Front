import RequireAuthentication from '../contexts/RequireAuthentication'
import SelectedCountryProvider from '../contexts/SelectedCountryProvider'
import Earth from './Earth'
import SidePanel from './SidePanel'
import Profil from './Profil.tsx'

export default function HomePage() {
  return (
    <div className="homepage">
      <SelectedCountryProvider>
        <Earth />
        <RequireAuthentication>
          <SidePanel />
          <Profil/>


        </RequireAuthentication>
      </SelectedCountryProvider>
    </div>
  )
}
