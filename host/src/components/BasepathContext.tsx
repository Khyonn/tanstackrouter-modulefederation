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
    const editTo = (to: string) =>
      isURLComplete(to) ? to : joinPaths([basepath, to]);

    return {
      ...router,
      basepath,
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
    } as typeof router;
  }, [router, basepath]);

  return <Provider value={editedRouter}>{children}</Provider>;
}
