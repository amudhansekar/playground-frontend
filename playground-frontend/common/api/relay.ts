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

interface Connection<T> {
  edges: [Edge<T>];
  pageInfo: PageInfo;
}

export type { Connection, Edge, PageInfo };
