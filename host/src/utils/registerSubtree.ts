import {
  AnyRootRoute,
  AnyRoute,
  createRoute,
  CatchNotFound,
} from "@tanstack/react-router";

export default async function registerSubtree(
  baseRoute: AnyRoute,
  subtreeLoader: () => Promise<{ routeTree: AnyRootRoute }>,
  NotFoundComponent = CatchNotFound
) {
  try {
    const { routeTree: subtree } = await subtreeLoader();
    const PathLessRoute = createRoute({
      id: `${baseRoute.id}/__root__`,
      component: subtree.options.component!,
      getParentRoute: () => baseRoute,
    });

    (subtree.children as AnyRoute[]).forEach((route) => {
      route.update({
        getParentRoute: () => PathLessRoute,
      } as Parameters<typeof route.update>[0]);
    });

    baseRoute.addChildren([PathLessRoute.addChildren(subtree.children)]);
  } catch {
    baseRoute.update({
      path: `${baseRoute.path}/$`,
      component: NotFoundComponent,
    } as Parameters<typeof baseRoute.update>[0]);
  }
}
