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

const edgesField = "edges";

const cursorField = "cursor";

const nodeField = "node";

const pageInfoField = "pageInfoField";

const hasPreviousPageField = "hasPreviousPage";

const hasNextPageField = "hasNextPage";

const startCursor = "startCursor";

const endCursor = "endCursor";

export type { Connection, Edge, PageInfo };

export {
  cursorField,
  edgesField,
  endCursor,
  hasNextPageField,
  hasPreviousPageField,
  nodeField,
  pageInfoField,
  startCursor,
};
