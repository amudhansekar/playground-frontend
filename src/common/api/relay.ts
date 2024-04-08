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
  edges: Edge<T>[];
  pageInfo: PageInfo;
}

interface ConvertingFunction<T> {
  (input: any): T;
}
function convertEdges<T>(
  edges: Edge<any>[],
  convertingFunction: ConvertingFunction<T>
): Edge<T>[] {
  return edges.map((edge) => {
    const convertedNode = convertingFunction(edge.node);
    return {
      cursor: edge.cursor,
      node: convertedNode,
    };
  });
}

const edgesField = "edges";

const cursorField = "cursor";

const nodeField = "node";

const pageInfoField = "pageInfoField";

const hasPreviousPageField = "hasPreviousPage";

const hasNextPageField = "hasNextPage";

const startCursorField = "startCursor";

const endCursorField = "endCursor";

export type { Connection, Edge, PageInfo };

export {
  convertEdges,
  cursorField,
  edgesField,
  endCursorField,
  hasNextPageField,
  hasPreviousPageField,
  nodeField,
  pageInfoField,
  startCursorField,
};
