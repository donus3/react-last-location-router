import { Navigate, NavigateProps } from 'react-router-dom'
import { FC } from 'react'

const RedirectWithoutLastLocation: FC<NavigateProps> = ({ state, ...rest }) => {
  const finalState = {
    ...state,
    preventLastLocation: true
  }

  return <Navigate {...rest} state={finalState} replace/>
}

export default RedirectWithoutLastLocation
