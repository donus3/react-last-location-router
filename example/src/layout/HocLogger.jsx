import { Outlet, useLocation } from "react-router";
import { withLastLocation } from "react-router-dom-last-location";

export const HocLoggerLayout = withLastLocation( ({lastLocation}) => {
  const location = useLocation()

  return (
    <>
      <Outlet />
      <div>
        <h3> Last Location state</h3>
        <pre>{JSON.stringify(lastLocation)}</pre>
      </div>

      <div>
        <h3> Current Location state</h3>
        <pre>{JSON.stringify(location)}</pre>
      </div>
    </>
  )
})
