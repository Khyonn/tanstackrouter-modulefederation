/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SubappImport } from './routes/subapp'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const SubappRoute = SubappImport.update({
  id: '/subapp',
  path: '/subapp',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/subapp': {
      id: '/subapp'
      path: '/subapp'
      fullPath: '/subapp'
      preLoaderRoute: typeof SubappImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/subapp': typeof SubappRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/subapp': typeof SubappRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/subapp': typeof SubappRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/subapp'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/subapp'
  id: '__root__' | '/' | '/subapp'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  SubappRoute: typeof SubappRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  SubappRoute: SubappRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/subapp"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/subapp": {
      "filePath": "subapp.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
