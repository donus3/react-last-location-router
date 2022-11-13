import { Location } from 'react-router-dom'

import { createContext } from 'react'

export type LastLocationType = Location | null

export interface LastLocationContextType {
  lastLocation: LastLocationType
  setLastLocation: (location: Location | null) => void
}

export const initialState: LastLocationType = null

const LastLocationContext = createContext<LastLocationContextType | null>(null)

export { LastLocationContext }
