import { init } from "@module-federation/enhanced/runtime";

const mf = init({
  name: "host",
  remotes: [],
});

const remotes = {
  subapp: `${import.meta.env.VITE_SUBAPP_URL}/mf-manifest.json`,
};

const alreadyRegistered = Object.fromEntries(
  Object.keys(remotes).map((name) => [name, false])
);

type ModuleName = `${keyof typeof remotes}/${string}`;

export default async function loadRemote<T = unknown>(moduleName: ModuleName) {
  const remote = moduleName.split("/")[0] as keyof typeof remotes;
  if (!(remote in remotes)) {
    throw new Error(
      `Can't fetch module "${moduleName}" : unknown remote "${remote}"`
    );
  }

  if (!alreadyRegistered[remote]) {
    mf.registerRemotes([{ name: remote, entry: remotes[remote] }]);
    alreadyRegistered[remote] = true;
  }
  return mf.loadRemote(moduleName) as Promise<T>;
}
