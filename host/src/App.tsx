import { createRouter, RouterProvider } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { routeTree } from "./routeTree.gen";
import { Route as SubappRoute } from "./routes/subapp";

import registerSubtree from "./utils/registerSubtree";
import loadRemote from "./utils/loadRemote";

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof buildRouter>;
  }
}

const buildRouter = () => createRouter({ routeTree });

const AppWithRoutes = lazy(async () => {
  // If we need to add more subtrees, we can use Promise.all() like
  // await Promise.all([
  //   registerSubtree(BaseRoute, () => loadRemoteModule("subapp/routeTree")),
  //   registerSubtree(AnotherSubAppRoute, () => loadRemoteModule("another-subapp/routeTree")),
  // ]);
  await registerSubtree(SubappRoute, () => loadRemote("subapp/routeTree"));

  // create router AFTER loading subapp(s) routeTrees
  const router = buildRouter();

  return {
    default() {
      return <RouterProvider router={router} />;
    },
  };
});

export default function App() {
  return (
    <Suspense fallback={<div>Loading routes...</div>}>
      <AppWithRoutes />
    </Suspense>
  );
}
