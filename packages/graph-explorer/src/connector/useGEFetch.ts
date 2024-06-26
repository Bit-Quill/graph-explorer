import { useCallback } from "react";
import localforage from "localforage";
import { CacheItem } from "./useGEFetchTypes";
import { useConfiguration, type ConnectionConfig } from "../core";
import { DEFAULT_SERVICE_TYPE } from "../utils/constants";
import { anySignal } from "./utils/anySignal";

// 10 minutes
const CACHE_TIME_MS = 10 * 60 * 1000;

const localforageCache = localforage.createInstance({
  name: "ge",
  version: 1.0,
  storeName: "connector-cache",
});

const useGEFetch = () => {
  const connection = useConfiguration()?.connection as
    | ConnectionConfig
    | undefined;
  const _getFromCache = useCallback(
    async key => {
      if (!connection?.enableCache) {
        return;
      }

      return localforageCache.getItem(key) as Promise<CacheItem | undefined>;
    },
    [connection?.enableCache]
  );

  const _setToCache = useCallback(
    async (key, value) => {
      if (connection?.enableCache) {
        return;
      }

      return localforageCache.setItem(key, value);
    },
    [connection?.enableCache]
  );

  const _requestAndCache = useCallback(
    async (
      url: URL,
      options: (RequestInit & { disableCache: boolean }) | undefined
    ) => {
      const response = await fetch(url, options);
      const data = await response.json();
      if (options?.disableCache !== true) {
        _setToCache(url, { data, updatedAt: new Date().getTime() });
      }
      return data as any;
    },
    [_setToCache]
  );

  const getAuthHeaders = useCallback(
    typeHeaders => {
      const headers: HeadersInit = {};
      if (connection?.proxyConnection) {
        headers["graph-db-connection-url"] = connection.graphDbUrl || "";
      }
      if (connection?.awsAuthEnabled) {
        headers["aws-neptune-region"] = connection.awsRegion || "";
        headers["service-type"] =
          connection.serviceType || DEFAULT_SERVICE_TYPE;
      }

      return { ...headers, ...typeHeaders };
    },
    [
      connection?.awsAuthEnabled,
      connection?.awsRegion,
      connection?.graphDbUrl,
      connection?.proxyConnection,
      connection?.serviceType,
    ]
  );

  const request = useCallback(
    async (uri, options) => {
      const cachedResponse = await _getFromCache(uri);
      if (
        cachedResponse &&
        cachedResponse.updatedAt + (connection?.cacheTimeMs ?? CACHE_TIME_MS) >
          new Date().getTime()
      ) {
        return cachedResponse.data;
      }

      const fetchOptions: RequestInit = {
        headers: getAuthHeaders(options.headers),
      };

      const connectionFetchTimeout = connection?.fetchTimeoutMs;

      if (connectionFetchTimeout && connectionFetchTimeout > 0) {
        const timeoutSignal = AbortSignal.timeout(connectionFetchTimeout);

        // Combine timeout with existing signal
        if (options.signal) {
          fetchOptions.signal = anySignal([timeoutSignal, options.signal]);
        } else {
          fetchOptions.signal = timeoutSignal;
        }
      }

      return _requestAndCache(uri, {
        ...options,
        ...fetchOptions,
      }) as Promise<any>;
    },
    [
      _getFromCache,
      _requestAndCache,
      connection?.cacheTimeMs,
      connection?.fetchTimeoutMs,
      getAuthHeaders,
    ]
  );

  return {
    request,
  };
};

export default useGEFetch;
