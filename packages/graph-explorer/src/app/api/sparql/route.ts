
import { NextResponse } from "next/server";
import { getSummaryApi } from "../../actions/summaryApi/getSummaryAPI";

export async function GET(request: Request) {
    const graphDBUrl = request.headers.get('graph-db-connection-url');
    const res = await getSummaryApi({ url: graphDBUrl, slug: 'rdf', path: "statistics/summary?mode=detailed" });
    if (!res) {
        return NextResponse.json({ error: "Error fetching summary" });
    }
    console.log("res: ", res);

    return NextResponse.json(res)
}

export async function POST(request: Request) {
    const rawUrl = `${request.headers.get("graph-db-connection-url")}/sparql`;
    if (!request.body?.query) {
        return NextResponse.json({ error: "[Proxy]SPARQL: Query not provided" });
    }
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `query=${encodeURIComponent(request.body.query)}`,
    };

    const res = await fetch(rawUrl, requestOptions)
    const data = await res.json()

    return NextResponse.json(data)
}