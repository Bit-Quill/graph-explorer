export function getAuthHeaders(connectionUrl: string, awsRegion: string) {
    const headerList = new Headers();
    if (connectionUrl) {
        headerList.set('graph-db-connection-url', connectionUrl);
    }
    if (awsRegion) {
        headerList.set('aws-neptune-region', awsRegion);
    }
    return headerList;
}