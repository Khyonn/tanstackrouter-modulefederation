import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <div>Hello host "__root"!</div>
      <Link to="/">Index</Link> | <Link to="/subapp">Subapp</Link> |{" "}
      <Link
        to={"/subapp/about/$id" as string}
        params={{ id: 1 }}
        search={{ filter: "hello" }}
      >
        Subapp about
      </Link>
      <hr />
      <Outlet />
    </React.Fragment>
  );
}
