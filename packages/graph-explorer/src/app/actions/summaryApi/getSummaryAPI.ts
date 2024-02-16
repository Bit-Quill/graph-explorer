'use server';
import { getLogger } from "../../utils/pino";
import { SummaryApiResponse, schema } from "./schema";
const logger = getLogger("getSummaryAPi");

export async function getSummaryApi({ url, slug, path }: { url: string, slug: string, path: string }) {
    const urlToFetch = `${url}/${slug}/${path}`;
    logger.debug({ href: urlToFetch }, "DEBUG getSummaryApi: urlToFetch");

    const response = await fetch(urlToFetch, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        logger.error({ status: response.status, statusText: response.statusText }, "DEBUG getSummaryApi: response");
        return undefined;
    }

    const result = await response.json();
    console.log("🚀 ~ getSummaryApi ~ result:", result)
    // const parsedPayload = schema.safeParse(result);
    // console.log("🚀 ~ getSummaryApi ~ parsedPayload:", parsedPayload)
    // if (!parsedPayload.success) {
    //     // Handle validation errors
    //     logger.error({ errors: parsedPayload.error.flatten().fieldErrors }, "DEBUG getSummaryApi: parsedPayload.error");
    //     return { error: "Error parsing response" };
    // }
    // logger.debug({ summaryApi: url, slug, path }, "DEBUG getSummaryApi: Success!");
    return result;
}