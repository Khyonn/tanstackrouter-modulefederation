# Tanstack/react-router + Module federation

This repository aims to show how to use @tanstack/react-router in a module federation architecture

For this example, I only use 2 applications : one host app, and one sub app.
Both have their router and can run independently. But in the host application, the idea is to route the subapp with its prefix (here /subapp)

Since errors can happen when letting 2 router instances coexist (eg: when using history back/forward), we will use only one router but we aggregate the subapp routeTree in the host routeTree.

So :

- On the subapp side : the subapp has to expose its tanstack/router routeTree

- On the host side :
  - The host will load the routeTree of the subapp and add it to its own routeTree
  - The host also encapsulate subapp components with a copy of the router so the subapp components will use a given basepath (eg: in Link href, or when using useNavigate())

## Use the project

I hope you are using pnpm. If so, you can install and run the project with the following commands at the root of the project

```sh
pnpm i && pnpm dev
```

Else you will have to run the following commands for both applications

```sh
npm i && npm run dev
```

The hostapp should start at localhost:5173 (or the next available port).  
The subapp will start at localhost:3000 (since its assets can be loaded from the host app, they are prefixed with server origin). If you need to run it in an another port, please create a .env.development.local and override the PORT value

## Other details

We only use "@module-federation/vite" only for exposing files and declaring shared dependencies in the bundling... not for register remotes or use the import syntax. In my own opinion and from my experience, if a remote can't be registered, it will throw a global error and we will get a blank page.
This is why, I prefer handle manually the loading of remotes (see [./host/src/utils/loadRemote.ts](./host/src/utils/loadRemote.ts))
