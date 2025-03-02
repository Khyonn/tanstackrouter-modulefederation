import {
  AnyRootRoute,
  AnyRoute,
  CatchNotFound,
  RouteComponent,
} from "@tanstack/react-router";
import BasepathContext from "../components/BasepathContext";

function provideBasepath(route: AnyRoute, RouteComponent: RouteComponent) {
  return function () {
    return (
      <BasepathContext basepath={(route.options as { path: string }).path}>
        <RouteComponent />
      </BasepathContext>
    );
  };
}

export default async function registerSubtree(
  baseRoute: AnyRoute,
  subtreeLoader: () => Promise<{ routeTree: AnyRootRoute }>,
  NotFoundComponent = CatchNotFound
) {
  try {
    const { routeTree: subtree } = await subtreeLoader();

    baseRoute.update({
      component: provideBasepath(baseRoute, subtree.options.component!),
    } as Parameters<typeof baseRoute.update>[0]);

    (subtree.children as AnyRoute[]).forEach((route) => {
      route.update({
        getParentRoute: () => baseRoute,
      } as Parameters<typeof route.update>[0]);
    });

    baseRoute.addChildren(subtree.children);
  } catch {
    baseRoute.update({
      path: `${baseRoute.path}/$`,
      component: NotFoundComponent,
    } as Parameters<typeof baseRoute.update>[0]);
  }
}
