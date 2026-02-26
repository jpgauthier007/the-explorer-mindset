/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type { ApiFromModules } from "convex/server";
import type * as subscribers from "../subscribers.js";

/**
 * A utility for referencing Convex functions in your app's API.
 */
declare const fullApi: ApiFromModules<{
  subscribers: typeof subscribers;
}>;
export declare const api: typeof fullApi;
export declare const internal: typeof fullApi;
