import Cookies from 'js-cookie';
import PlaygroundApiError from '../error/playground-api-error';

function buildRequestObject(
  url: string,
  requestMethod: string,
  queryParams?: string | string[][] | Record<string, string> | URLSearchParams,
  inputHeaders: object = { 'Content-Type': 'application/json' },
  data?: BodyInit
): Request {
  const csrfToken = Cookies.get('XSRF-TOKEN');
  const finalHeaders =
    csrfToken !== undefined
      ? {
          'X-XSRF-TOKEN': csrfToken,
          ...inputHeaders,
        }
      : inputHeaders;

  const totalUrl = // todo - change to use env file
    queryParams === undefined
      ? `http://localhost:8080${url}`
      : `http://localhost:8080${url}?${new URLSearchParams(
          queryParams
        ).toString()}`;
  return new Request(totalUrl, {
    method: requestMethod, // GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, same-origin
    cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      ...finalHeaders,
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: data,
  });
}

async function runFetch(
  url: string,
  requestMethod: string,
  queryParams?: string | string[][] | Record<string, string> | URLSearchParams,
  inputHeaders?: object,
  data?: BodyInit
): Promise<Response> {
  return fetch(
    buildRequestObject(url, requestMethod, queryParams, inputHeaders, data)
  );
}

async function handleErrorResponse(response: Response): Promise<void> {
  if (!response.ok) {
    throw await PlaygroundApiError.fromApiResponse(response);
  }
}

async function runFetchReturnData(
  url: string,
  requestMethod: string,
  queryParams?: string | string[][] | Record<string, string> | URLSearchParams,
  inputHeaders?: object,
  data?: BodyInit
): Promise<unknown> {
  const response = await fetch(
    buildRequestObject(url, requestMethod, queryParams, inputHeaders, data)
  );

  await handleErrorResponse(response);

  return response.json(); // parses JSON response into native JavaScript objects
}

/**
 * Peforms a GET request without parsing the return data
 * @param url url to send to
 * @param queryParams
 * @param headers request headers - null if you want browser to decide headers
 * @returns a Promise wrapped around a Response
 */
async function get(
  url: string,
  queryParams?: string | string[][] | Record<string, string> | URLSearchParams,
  headers?: object
): Promise<Response> {
  return runFetch(url, 'GET', queryParams, headers);
}

/**
 * Peforms a GET request and parses the return data
 * @param url url to send to
 * @param queryParams
 * @param headers request headers - null if you want browser to decide headers
 * @returns a Promise wrapped around the JSON response
 */
async function getReturnData(
  url: string,
  queryParams?: string | string[][] | Record<string, string> | URLSearchParams,
  headers?: object
): Promise<unknown> {
  return runFetchReturnData(url, 'GET', queryParams, headers);
}

/**
 * Performs a POST request without parsing the return data
 * @param url url to send to
 * @param data data to send to server
 * @param headers request headers - null if you want browser to decide headers
 * @returns a Promise wrapped around a Response
 */
async function post(
  url: string,
  data?: BodyInit,
  headers?: object
): Promise<Response> {
  return runFetch(url, 'POST', undefined, headers, data);
}

/**
 * Performs a POST request and parses return data
 * @param url url to send to
 * @param data data to send to server
 * @param headers request headers - null if you want browser to decide headers
 * @returns a Promise wrapped around the JSON response
 */
async function postReturnData(
  url: string,
  data?: BodyInit,
  headers?: object
): Promise<unknown> {
  return runFetchReturnData(url, 'POST', undefined, headers, data);
}

async function put(
  url: string,
  data?: BodyInit,
  headers?: object
): Promise<Response> {
  return runFetch(url, 'PUT', undefined, headers, data);
}

/**
 * Performs a PUT request and parses return data
 * @param url url to send to
 * @param data data to send to server
 * @param headers request headers - null if you want browser to decide headers
 * @returns a Promise wrapped around the JSON response
 */
async function putReturnData(
  url: string,
  data?: BodyInit,
  headers?: object
): Promise<unknown> {
  return runFetchReturnData(url, 'PUT', undefined, headers, data);
}

export { get, getReturnData, post, postReturnData, put, putReturnData };
