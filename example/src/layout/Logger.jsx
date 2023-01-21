import { Outlet, useLocation } from "react-router";
import { useLastLocation } from "react-router-dom-last-location";

export function LoggerLayout() {
  const location = useLocation()
  const lastLocation = useLastLocation();

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
}
