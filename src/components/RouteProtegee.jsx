import { Navigate, Outlet, useOutletContext } from 'react-router'

function RouteProtegee() {
  const contexte = useOutletContext()

  if (!contexte.connecte) {
    return <Navigate to="/connexion" replace />
  }

  return <Outlet context={contexte} />
}

export default RouteProtegee