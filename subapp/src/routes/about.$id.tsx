import { createFileRoute, useParams, useSearch } from "@tanstack/react-router";
import { z } from "zod";

const aboutSearchSchema = z
  .object({ filter: z.string().optional() })
  .optional();

export const Route = createFileRoute("/about/$id")({
  component: RouteComponent,
  validateSearch: (search) => aboutSearchSchema.parse(search),
});

function RouteComponent() {
  const params = useParams({ from: "/about/$id" });
  const params2 = Route.useParams();
  const search = useSearch({ from: "/about/$id" });
  return (
    <div>
      Hello "/about"!
      <pre>{JSON.stringify({ params, params2, search }, null, 2)}</pre>
    </div>
  );
}
