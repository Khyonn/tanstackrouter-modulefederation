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

The bundling of the module federation is done with the vite plugin (@module-federation/vite). But instead of using import syntax with the plugin, we will use the "loadRemote()" from "@module-federation/enhanced/runtime". This way, we can handle errors (like if the subapp is down, it will not break all the host app)
