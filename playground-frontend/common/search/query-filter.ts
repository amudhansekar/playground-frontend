import ApiFilter from './api-filter';
import QueryOperator from './query-operator';

class QueryFilter implements ApiFilter {
  field: string;
  operator: QueryOperator;
  value?: string;
  values?: string[];

  constructor(
    field: string,
    operator: QueryOperator,
    value?: string,
    values?: string[]
  ) {
    this.field = field;
    this.operator = operator;
    this.value = value;
    this.values = values;
  }
}

export default QueryFilter;
