enum QueryOperator {
  EQUALS = "EQUALS",
  NOT_EQUALS = "NOT_EQUALS",
  GREATER_THAN = "GREATER_THAN",
  GREATER_THAN_OR_EQUALS = "GREATER_THAN_OR_EQUALS",
  LESS_THAN = "LESS_THAN",
  LESS_THAN_OR_EQUALS = "LESS_THAN_OR_EQUALS",
  IN = "IN",
  LIKE = "LIKE",
}

interface ApiFilter {
  field: string;
  operator: QueryOperator;
  value: string | string[];
}

class QueryFilter implements ApiFilter {
  field: string;
  operator: QueryOperator;
  value: string | string[];

  constructor(
    field: string,
    operator: QueryOperator,
    value: string | string[]
  ) {
    this.field = field;
    this.operator = operator;
    this.value = value;
  }
}

export { QueryFilter, QueryOperator };
export type { ApiFilter };
