import queryString from 'query-string';

function generateLinks(
  baseUrl: string,
  from: number,
  limit: number,
  queryParams: { [prop: string]: string | number },
  total: number,
): string[] {
  let nextFrom = from + limit;
  if (nextFrom >= total) {
    nextFrom = null;
  }
  const links = [`<${baseUrl}?${queryString.stringify(queryParams)}>; rel="self"`];
  if (nextFrom) {
    links.push(`<${baseUrl}?${queryString.stringify({ ...queryParams, from: nextFrom })}>; rel="next"`);
  }
  return links;
}

export { generateLinks };
