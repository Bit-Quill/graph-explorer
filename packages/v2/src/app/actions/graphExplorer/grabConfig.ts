'use server';

export async function grabConfig() {
    // const defaultConnectionPath = `${location.origin}/defaultConnection`;
    // const sagemakerConnectionPath = `${location.origin}/proxy/9250/defaultConnection`;
    // let defaultConnectionFile;

    // const params = queryString.parse(location.search) as {
    //     configFile?: string;
    // };

    // if (params.configFile) {
    //     return {
    //         id: params.configFile,
    //         remoteConfigFile: params.configFile,
    //     };
    // }

    try {
        defaultConnectionFile = await fetch(defaultConnectionPath);

        if (!defaultConnectionFile.ok) {
            // eslint-disable-next-line no-console
            console.log(
                `Failed to find default connection file at .../defaultConnection, trying path for Sagemaker.`
            );
            defaultConnectionFile = await fetch(sagemakerConnectionPath);
            if (defaultConnectionFile.ok) {
                // eslint-disable-next-line no-console
                console.log(`Found file at ../proxy/9250/defaultConnection.`);
            } else {
                // eslint-disable-next-line no-console
                console.log(
                    `Did not find file at ../proxy/9250/defaultConnection. No defaultConnectionFile will be set.`
                );
            }
        } else {
            // eslint-disable-next-line no-console
            console.log(`Found file at ../defaultConnection.`);
        }

        const contentType = defaultConnectionFile.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            return;
        }

        const defaultConnectionData = await defaultConnectionFile.json();
        return {
            id: "Default Connection",
            displayLabel: "Default Connection",
            connection: {
                url: defaultConnectionData.GRAPH_EXP_PUBLIC_OR_PROXY_ENDPOINT || "",
                queryEngine: defaultConnectionData.GRAPH_EXP_GRAPH_TYPE,
                proxyConnection: !!defaultConnectionData.GRAPH_EXP_USING_PROXY_SERVER,
                graphDbUrl: defaultConnectionData.GRAPH_EXP_CONNECTION_URL || "",
                awsAuthEnabled: !!defaultConnectionData.GRAPH_EXP_IAM,
                awsRegion: defaultConnectionData.GRAPH_EXP_AWS_REGION || "",
                fetchTimeoutMs:
                    defaultConnectionData.GRAPH_EXP_FETCH_REQUEST_TIMEOUT || 240000,
            },
        };
    } catch (error) {
        console.error(`Error when trying to create connection: ${error.message}`);
    }
}