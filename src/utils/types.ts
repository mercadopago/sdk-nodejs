/**
 * Utility-layer type definitions.
 *
 * @module utils/types
 */

/**
 * Lightweight REST client configuration.
 *
 * Used in contexts where only timeout and query parameters are needed
 * (as opposed to the full {@link Options} set).
 */
export declare type RestClientConfig = {
  /** HTTP request timeout in milliseconds. */
  timeout?: number;
  /** Key-value pairs appended to the request URL as query-string parameters. */
  queryParams?: Record<string, string | number>;
}
