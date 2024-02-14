import { useCallback, useMemo } from "react";
import { ConnectionConfig, useConfiguration } from "../../core";
import fetchNeighbors from "./queries/fetchNeighbors";
import fetchNeighborsCount from "./queries/fetchNeighborsCount";
import fetchSchema from "./queries/fetchSchema";
import fetchVertexTypeCounts from "./queries/fetchVertexTypeCounts";
import keywordSearch from "./queries/keywordSearch";
import useGEFetch from "../useGEFetch";
import { GraphSummary } from "./types";
import { useRecoilValue } from "recoil";
import { mergedConfigurationSelector } from "@/app/core/StateProvider/configuration";
const useGremlin = () => {
  const config = useRecoilValue(mergedConfigurationSelector);
  console.log("🚀 ~ useGremlin ~ config:", config)
  const connectionUrl = config?.connection?.url as string;
  console.log("🚀 ~ useGremlin ~ connectionUrl:", connectionUrl)

  const _rawIdTypeMap = useMemo(() => {
    return new Map<string, "string" | "number">();
  }, []);

  const _gremlinFetch = useCallback((options) => {
    return async (queryTemplate: string) => {

      console.log("🚀 ~ return ~ queryTemplate:", queryTemplate)
      const body = JSON.stringify({ queryTemplate });
      return fetch(`api/gremlin`, {
        method: "POST",
        headers: {
          'graph-db-connection-url': connectionUrl,
          'Content-Type': 'application/json',
        },
        body,
      });

    };
  }, [connectionUrl]);

  const fetchSchemaFunc = useCallback(async (options) => {
    const ops = { ...options, disableCache: true };
    let summary;
    try {
      const response = await fetch('api/gremlin', {
        method: "GET",
        headers: {
          'graph-db-connection-url': connectionUrl,
        },
        ...ops
      });
      summary = await response.payload.graphSummary as GraphSummary || undefined;
    } catch (e) {

      console.error("[Summary API]", e);
    }
    return fetchSchema(_gremlinFetch(ops), summary);
  }, [_gremlinFetch, connectionUrl]);

  const fetchVertexCountsByType = useCallback((req, options) => {
    return fetchVertexTypeCounts(_gremlinFetch(options), req);
  }, [_gremlinFetch]);

  const fetchNeighborsFunc = useCallback((req, options) => {
    return fetchNeighbors(_gremlinFetch(options), req, _rawIdTypeMap);
  }, [_gremlinFetch, _rawIdTypeMap]);

  const fetchNeighborsCountFunc = useCallback((req, options) => {
    return fetchNeighborsCount(_gremlinFetch(options), req, _rawIdTypeMap);
  }, [_gremlinFetch, _rawIdTypeMap]);

  const keywordSearchFunc = useCallback((req, options) => {
    return keywordSearch(_gremlinFetch(options), req, _rawIdTypeMap);
  }, [_gremlinFetch, _rawIdTypeMap]);

  return {
    fetchSchema: fetchSchemaFunc,
    fetchVertexCountsByType,
    fetchNeighbors: fetchNeighborsFunc,
    fetchNeighborsCount: fetchNeighborsCountFunc,
    keywordSearch: keywordSearchFunc,
  };
};

export default useGremlin;