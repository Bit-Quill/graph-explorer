'use server';
import localforage from "localforage";

const localforageCache = localforage.createInstance({
    name: "GraphExplorer",
    version: 2.0,
    storeName: "connector-cache",
});

export async function graphExplorerFetch(request: { body: { uri: any; options: any; }; connection: { cacheTimeMs: any; fetchTimeoutMs: number; }; }) {
    const { uri, options } = request.body;

    // Check for cached response
    const cachedResponse = await localforageCache.getItem(uri);
    if (
        cachedResponse &&
        cachedResponse.updatedAt +
        (request.connection?.cacheTimeMs) >
        new Date().getTime()
    ) {
        return cachedResponse.data;
    }
    const headerList = new Headers();
    if (request.connection.connectionUrl) {
        headerList.set('graph-db-connection-url', request.connection.connectionUrl);
    }
    if (request.connection.awsRegion) {
        headerList.set('aws-neptune-region', request.connection.awsRegion);
    }

    // Fetch data and cache if needed
    const response = await fetch(uri, { headers: headerList });
    const data = await response.json();
    if (!options?.disableCache) {
        await localforageCache.setItem(uri, { data, updatedAt: new Date().getTime() });
    }

    return data;
}