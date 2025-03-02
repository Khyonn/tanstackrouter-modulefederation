import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <div>Hello subapp "__root"!</div>
      <Link to="/">Index</Link> |{" "}
      <Link to="/about/$id" params={{ id: "2" }}>
        About
      </Link>
      <hr />
      <Outlet />
    </React.Fragment>
  );
}
