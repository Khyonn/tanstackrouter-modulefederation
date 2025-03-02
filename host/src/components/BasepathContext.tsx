import { getRouterContext, joinPaths, useRouter } from "@tanstack/react-router";
import { useMemo } from "react";

const isURLComplete = (url: string) => {
  try {
    new URL(url); // if it throws, it's not a complete URL (with protocol, domain, etc)
    return true;
  } catch {
    return false;
  }
};

export default function BasepathContext({
  basepath,
  children,
}: {
  basepath: string;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const Provider = getRouterContext().Provider;
  const editedRouter = useMemo(() => {
    const editTo = (to?: string) =>
      to && (isURLComplete(to) ? to : joinPaths([basepath, to]));

    let oldState: (typeof router)["__store"]["state"];
    let editedState: typeof oldState;

    return {
      ...router,
      navigate(opt) {
        return router.navigate({
          ...opt,
          to: editTo(opt.to as string),
        } as typeof opt);
      },
      buildLocation(opt) {
        return router.buildLocation({
          ...opt,
          to: editTo(opt.to as string),
        } as typeof opt);
      },
      __store: new Proxy(router.__store, {
        get(...args) {
          const [target, prop] = args;
          if (prop === "state") {
            if (oldState !== target.state) {
              oldState = target.state;
              editedState = {
                ...oldState,
                matches: oldState.matches.map((m) => ({
                  ...m,
                  routeId: joinPaths([m.routeId.replace(basepath, "/")]),
                })),
              } as typeof editedState;
            }
            return editedState;
          }
          return Reflect.get(...args);
        },
      }),
      routesById: new Proxy(router.routesById, {
        get(...args) {
          const [target, routeId] = args;
          const otherPath = joinPaths([
            basepath,
            routeId as string,
          ]) as keyof typeof target;
          return target[otherPath] || Reflect.get(...args);
        },
      }),
    } as typeof router;
  }, [router, basepath]);

  return <Provider value={editedRouter}>{children}</Provider>;
}
