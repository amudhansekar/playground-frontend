import PlaygroundApiError from '../error/playground-api-error';

const GRAPHQL_URL = '/graphql';

function buildRequestObject(
  data: BodyInit,
  inputHeaders: object = {}
): Request {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL + GRAPHQL_URL;

  return new Request(baseUrl, {
    method: 'POST',
    mode: 'cors', // no-cors, cors, same-origin
    headers: {
      'Content-Type': 'application/json',
      ...inputHeaders,
    },
    body: data,
  });
}

async function fetchData(data: string, inputHeaders?: object): Promise<any> {
  const response = await fetch(buildRequestObject(data, inputHeaders));

  return await response.json(); // parses JSON response into native JavaScript objects
}

async function query(query: string, headers?: object): Promise<any> {
  const body = JSON.stringify({
    query: query,
  });
  return await fetchData(body, headers);
}

async function mutate(mutation: string, headers: object): Promise<any> {
  const body = JSON.stringify({
    mutation: mutation,
  });
  return await fetchData(body, headers);
}

export { query, mutate };
