interface SortApiResponseDto {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface PageableApiResponseDto {
  offset: number;
  page_number: number;
  page_size: number;
  paged: boolean;
  unpaged: boolean;
  sort: SortApiResponseDto;
}

interface PageApiResponseDto<T> {
  content: [T];
  total_pages: number;
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  number_of_elements: number;
  empty: boolean;
  pageable: PageableApiResponseDto;
  sort: SortApiResponseDto;
}

export type { PageApiResponseDto, SortApiResponseDto, PageableApiResponseDto };
