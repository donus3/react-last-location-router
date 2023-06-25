import { ComponentType } from 'react'
import { LastLocationContextType } from '../context/lastLocation'
import { useLastLocation } from '../hooks/useLastLocation'

export interface WithLastLocationProps {
  lastLocation: Partial<LastLocationContextType>
}

export function withLastLocation<P> (WrappedComponent: ComponentType<P & WithLastLocationProps>) {
  const WithLocationComponent = (props: P) => {
    const lastLocation = useLastLocation()

    return <WrappedComponent {...props} lastLocation={lastLocation} />
  }

  return WithLocationComponent
}
