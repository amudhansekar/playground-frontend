interface PageInfo {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  startCursor: string;
  endCursor: string;
}

interface Edge<T> {
  cursor: string;
  node: T;
}

/**
 * Representation for graphql cursor connection
 * See {@link https://relay.dev/graphql/connections.htm}
 */

interface Connection<T> {
  edges: [Edge<T>];
  pageInfo: PageInfo;
}

export type { Connection, Edge, PageInfo };
