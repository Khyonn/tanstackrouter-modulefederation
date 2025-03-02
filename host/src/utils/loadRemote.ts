import { init } from "@module-federation/enhanced/runtime";

const mf = init({
  name: "host",
  remotes: [],
});

const remotes = {
  subapp: `${import.meta.env.VITE_SUBAPP_URL}/mf-manifest.json`,
};

type ModuleName = `${keyof typeof remotes}/${string}`;

const remoteRegisterPromises = {} as Record<
  keyof typeof remotes,
  Promise<unknown>
>;

export default async function loadRemote<T = unknown>(moduleName: ModuleName) {
  if (import.meta.env.TEST) {
    throw new Error("Don't load remote during tests");
  }
  const remote = moduleName.split("/")[0] as keyof typeof remotes;
  if (!(remote in remotes)) {
    throw new Error(
      `Can't fetch module "${moduleName}" : unknown remote "${remote}"`
    );
  }

  if (!remoteRegisterPromises[remote]) {
    // Since module-federation registerRemotes() doesn't return a promise,
    // we need to make sure the remote manifest.json exists (with a fetch)
    // before calling registerRemotes()
    remoteRegisterPromises[remote] = fetch(remotes[remote]).then(() => {
      mf.registerRemotes([{ name: remote, entry: remotes[remote] }]);
    });
  }
  await remoteRegisterPromises[remote];
  return mf.loadRemote(moduleName) as Promise<T>;
}
