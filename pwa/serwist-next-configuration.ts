import { PrecacheEntry, Serwist, SerwistGlobalConfig } from "serwist";
import { BASE_URL } from "@constants/config.constant";
import { CACHE_NAME, CACHE_VERSION } from "./pwa.config.constant";
import { defaultCache } from "@serwist/next/worker";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

// Static routes configuration
const staticRoutes = [
  "/",
  "/survey",
  "/content",
  "/about",
  "/auth/login",
  "/motor-following-task",
  "/offline",
].map((path) => ({
  url: `${BASE_URL}${path}`,
  revision: CACHE_VERSION,
}));

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  precacheOptions: {
    ignoreURLParametersMatching: [/^attempt$/],
  },
  skipWaiting: true,
  clientsClaim: true,
  runtimeCaching: defaultCache,
  fallbacks: {
    entries: [
      {
        url: `${BASE_URL}/offline`,
        matcher: ({ request }: { request: Request }) =>
          request.destination === "document" && request.mode === "navigate",
      },
    ],
  },
});

serwist.addToPrecacheList([...staticRoutes]);

serwist.addEventListeners();
