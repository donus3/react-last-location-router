import { useContext } from 'react'
import { LastLocationContext, LastLocationContextType } from '../context/lastLocation'

export const useLastLocation = (): (Partial<LastLocationContextType>) => {
  return { ...useContext(LastLocationContext) }
}
