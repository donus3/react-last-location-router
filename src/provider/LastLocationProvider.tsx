import { FC, useEffect, useReducer, useState } from 'react'
import { useLocation, Location } from 'react-router-dom'
import { actions } from '../context/action'

import { initialState, LastLocationContext, LastLocationType } from '../context/lastLocation'
import { reducer } from '../context/reducer'

import { shouldPrevent, hasBeenPrevented, prevent } from './prevent'

interface LastLocationProviderProps {
  watchOnlyPathname?: boolean
  children?: React.ReactNode
}

export const LastLocationProvider: FC<LastLocationProviderProps> = ({ children, watchOnlyPathname = false }) => {
  const [currentLocation, setCurrentLocation] = useState<LastLocationType>(null)
  const location = useLocation()
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = {
    lastLocation: state,
    setLastLocation: (location: Location | null) => {
      dispatch({ type: actions.SET_LAST_LOCATION, payload: location })
    }
  }

  const updateLastLocation = (): void => {
    if (location === null || location === currentLocation || (watchOnlyPathname && currentLocation?.pathname === location.pathname)) {
      return
    }

    if (shouldPrevent(location) && !hasBeenPrevented(location)) {
      prevent(location)
      return
    }

    value.setLastLocation(currentLocation)
  }

  useEffect(() => {
    updateLastLocation()
    setCurrentLocation(location)
  }, [location])

  return (
    <LastLocationContext.Provider value={value}>{children}</LastLocationContext.Provider>
  )
}
