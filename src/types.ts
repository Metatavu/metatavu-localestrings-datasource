import { DataQuery, DataSourceJsonData } from '@grafana/data';

/**
 * Locale strings query structure.
 */
export interface LocaleStringsQuery extends DataQuery {
  language: string;
  key: string;
}

/**
 * Default query parameters
 */
export const DEFAULT_QUERY: Partial<LocaleStringsQuery> = {
  language: "en-US",
  key: "locale"
};

/**
 * These are options configured for each DataSource instance
 */
export interface LocaleStringsSourceOptions extends DataSourceJsonData {
}

/**
 * Value that is used in the backend, but never sent over HTTP to the frontend
 */
export interface LocaleStringsSecureJsonData {
}

/**
 * Locale bundle
 */
export type LocaleBundle = {
  [key: string]: string;
};