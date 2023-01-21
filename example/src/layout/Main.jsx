import { Outlet } from "react-router";
import { LastLocationProvider } from "react-router-dom-last-location";

export function MainLayout() {

  return (
    <>
      <LastLocationProvider>
        <Outlet />
      </LastLocationProvider>
    </>
  )
}
