import pino, { Logger } from 'pino';
import * as z from 'zod';

// more granular control over log levels
const logLevelData = {
    "*": "silent",
    connectionPage: "silent",
    dataPage: "silent",
    graphPage: "silent",
    getSummaryAPi: "debug",
    getSPARQLQuery: "silent",
    getOpenCypherQuery: "silent",
    getGremlinQuery: "silent",
};

type LogLevelKeys = keyof typeof logLevelData;

export function getLogger<T extends LogLevelKeys>(name: T): Logger {
    const level = logLevelData[name] || logLevelData["*"] || "info";
    return pino({ name, level });
}

// Default logger
export const defaultLogger = getLogger("*");

// // Example usage:
// const logger = getLogger("getSummaryAPi");
// logger.error("a error message from test");
// // or
// defaultLogger.info("General information message");