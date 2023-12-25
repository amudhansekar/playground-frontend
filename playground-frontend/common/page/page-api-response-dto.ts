interface SortApiDtoResponse {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface PageableApiDtoResponse {
  offset: number;
  page_number: number;
  page_size: number;
  paged: boolean;
  unpaged: boolean;
  sort: SortApiDtoResponse;
}

interface PageApiDtoResponse<T> {
  content: [T];
  total_pages: number;
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  number_of_elements: number;
  empty: boolean;
  pageable: PageableApiDtoResponse;
  sort: SortApiDtoResponse;
}

export type { PageApiDtoResponse, SortApiDtoResponse, PageableApiDtoResponse };
