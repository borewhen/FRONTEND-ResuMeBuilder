import { type ZodType } from "zod";

export type BaseOptions = Omit<RequestInit, "body" | "method"> | undefined;
export type BaseBody = RequestInit["body"] | Record<string, unknown>;

/** Base class for all PINTU API helpers. */
export class Api {
  /** Base URL for the API endpoint */
  url: string = "";
  /** Validation schemas used to parse API responses or request bodies */
  schemas: Record<string, Record<string, ZodType> | ZodType> = {};
}

/** Error thrown when credentials are missing from `localStorage`. */
export class CredentialError extends Error {
  constructor(message: string, cause?: Error) {
    super(message, { cause });
  }
}

/** Response for an authorized request */
export type UnauthorizedResponse = {
  detail: string;
};

/** Imposes a type-safe get method on a class. */
export interface Get<Response, Options extends BaseOptions> {
  get(options?: Options): Promise<Response>;
}

/** Imposes a type-safe post method on a class. */
export interface Post<
  Body extends BaseBody,
  Response,
  Options extends BaseOptions,
> {
  post(body: Body, options: Options): Promise<Response>;
}

/** Imposes a type-safe put method on a class. */
export interface Put<
  Body extends BaseBody,
  Response,
  Options extends BaseOptions,
> {
  put(body: Body, options: Options): Promise<Response>;
}

/** Imposes a type-safe delete method on a class. */
export interface Delete<
  Body extends BaseBody,
  Response,
  Options extends BaseOptions,
> {
  delete(body: Body, options: Options): Promise<Response>;
}

