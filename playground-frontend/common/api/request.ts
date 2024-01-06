import PlaygroundApiError from '../error/playground-api-error';

function buildRequestObject(
  url: string,
  requestMethod: string,
  queryParams?: string | string[][] | Record<string, string> | URLSearchParams,
  inputHeaders: object = { 'Content-Type': 'application/json' },
  data?: BodyInit
): Request {
  let baseUrl = process.env.NEXT_PUBLIC_SERVER_URL + url;
  if (queryParams !== undefined) {
    baseUrl += '?' + new URLSearchParams(queryParams).toString();
  }

  return new Request(baseUrl, {
    method: requestMethod, // GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, same-origin
    cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      ...inputHeaders,
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: data,
  });
}

async function fetchData(
  url: string,
  requestMethod: string,
  queryParams?: string | string[][] | Record<string, string> | URLSearchParams,
  inputHeaders?: object,
  data?: BodyInit
): Promise<any> {
  const response = await fetch(
    buildRequestObject(url, requestMethod, queryParams, inputHeaders, data)
  );

  void (await handleErrorResponse(response));

  return await response.json(); // parses JSON response into native JavaScript objects
}

async function handleErrorResponse(response: Response): Promise<void> {
  if (!response.ok) {
    throw await PlaygroundApiError.fromApiResponse(response);
  }
}

/**
 * Peforms a GET request and parses returning json data
 * @param url url to send to
 * @param queryParams
 * @param headers request headers - null if you want browser to decide headers
 * @returns a Promise wrapped around a Response
 */
async function getData(
  url: string,
  queryParams?: string | string[][] | Record<string, string> | URLSearchParams,
  headers?: object
): Promise<any> {
  return await fetchData(url, 'GET', queryParams, headers);
}

/**
 * Performs a POST request and parses returning json data
 * @param url url to send to
 * @param data data to send to server
 * @param headers request headers - null if you want browser to decide headers
 * @returns a Promise wrapped around the JSON response
 */
async function postData(
  url: string,
  data?: BodyInit,
  headers?: object
): Promise<any> {
  return await fetchData(url, 'POST', undefined, headers, data);
}

export { getData, postData };
