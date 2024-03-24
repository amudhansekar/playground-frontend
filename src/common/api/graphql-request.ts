import { jsonToGraphQLQuery } from "json-to-graphql-query";

const GRAPHQL_URL = "/graphql";

function buildRequestObject(
  data: BodyInit,
  inputHeaders: object = {}
): Request {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL + GRAPHQL_URL;

  return new Request(baseUrl, {
    method: "POST",
    mode: "cors", // no-cors, cors, same-origin
    headers: {
      "Content-Type": "application/json",
      ...inputHeaders,
    },
    body: data,
  });
}

async function fetchData(data: string, inputHeaders?: object): Promise<any> {
  const response = await fetch(buildRequestObject(data, inputHeaders));

  return await response.json(); // parses JSON response into native JavaScript objects
}

async function query(
  query: object,
  headers?: object
): Promise<GraphQLResponse> {
  const graphQLQuery = { query: query };
  const body = JSON.stringify({
    query: jsonToGraphQLQuery(graphQLQuery),
  });
  return await fetchData(body, headers);
}

async function mutate(
  mutation: object,
  headers: object
): Promise<GraphQLResponse> {
  const graphQLQuery = { mutation: mutation };
  const body = JSON.stringify({
    query: jsonToGraphQLQuery(graphQLQuery),
  });
  return await fetchData(body, headers);
}

interface GraphQLResponse {
  data: any;
  errors: any;
}

export { mutate, query };
export type { GraphQLResponse };
