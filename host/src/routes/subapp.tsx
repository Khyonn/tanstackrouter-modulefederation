import { createFileRoute, Outlet } from "@tanstack/react-router";
import BasepathContext from "../components/BasepathContext";

const basepath = "/subapp";
export const Route = createFileRoute(basepath)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/subapp"!
      <BasepathContext basepath={basepath}>
        {/* The outlet is necessary for subapp components to be displayed */}
        <Outlet />
      </BasepathContext>
    </div>
  );
}
