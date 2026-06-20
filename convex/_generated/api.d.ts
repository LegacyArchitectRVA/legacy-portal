/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as ResendEmail from "../ResendEmail.js";
import type * as admin from "../admin.js";
import type * as auth from "../auth.js";
import type * as constants from "../constants.js";
import type * as http from "../http.js";
import type * as legalDocuments from "../legalDocuments.js";
import type * as messages from "../messages.js";
import type * as passkeyAuth from "../passkeyAuth.js";
import type * as profile from "../profile.js";
import type * as sections from "../sections.js";
import type * as security from "../security.js";
import type * as seedTestUser from "../seedTestUser.js";
import type * as testAuth from "../testAuth.js";
import type * as users from "../users.js";
import type * as viktorTools from "../viktorTools.js";
import type * as webauthn from "../webauthn.js";
import type * as webauthnNode from "../webauthnNode.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  ResendEmail: typeof ResendEmail;
  admin: typeof admin;
  auth: typeof auth;
  constants: typeof constants;
  http: typeof http;
  legalDocuments: typeof legalDocuments;
  messages: typeof messages;
  passkeyAuth: typeof passkeyAuth;
  profile: typeof profile;
  sections: typeof sections;
  security: typeof security;
  seedTestUser: typeof seedTestUser;
  testAuth: typeof testAuth;
  users: typeof users;
  viktorTools: typeof viktorTools;
  webauthn: typeof webauthn;
  webauthnNode: typeof webauthnNode;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
