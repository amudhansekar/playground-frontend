import QueryOperator from './query-operator';

interface ApiFilter {
  field: string;
  operator: QueryOperator;
  value?: string;
  values?: string[];
}

export default ApiFilter;
