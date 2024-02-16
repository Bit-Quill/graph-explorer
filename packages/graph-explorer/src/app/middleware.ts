import { NextResponse } from 'next/server';
import aws4 from 'aws4';
import { fromNodeProviderChain } from '@aws-sdk/credential-providers';

export async function middleware(request: Request) {
  try {
    const options = {
      host: request.headers.get('graph-db-connection-url'),
      path: '/sparql',
      service: 'neptune-db',
      region: 'us-west-2',
      method: request.method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const headers = await getIAMHeaders(options);

    // Clone the request to modify its headers
    const modifiedRequest = new Request(request, {
      headers: {
        ...request.headers,
        ...headers,
      },
    });

    return NextResponse.next(modifiedRequest);
  } catch (error) {
    console.error('Error in IAM middleware:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

// Adapted IAM headers function to be used in the middleware
async function getIAMHeaders(options: any) {
  const credentialProvider = fromNodeProviderChain();
  let creds = await credentialProvider();
  if (creds === undefined) {
    throw new Error(
      "IAM is enabled but credentials cannot be found on the credential provider chain."
    );
  }
  const signedOptions = aws4.sign(options, {
    accessKeyId: creds.accessKeyId,
    secretAccessKey: creds.secretAccessKey,
    sessionToken: creds.sessionToken,
  });

  return signedOptions.headers;
}