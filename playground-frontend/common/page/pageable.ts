import { PageableApiDtoResponse } from './page-api-response-dto';
import Sort from './sort';

class Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
  sort: Sort;

  constructor(
    offset: number,
    pageNumber: number,
    pageSize: number,
    paged: boolean,
    unpaged: boolean,
    sort: Sort
  ) {
    this.offset = offset;
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.paged = paged;
    this.unpaged = unpaged;
    this.sort = sort;
  }

  static fromApiResponseDto(pageableDto: PageableApiDtoResponse): Pageable {
    return new Pageable(
      pageableDto.offset,
      pageableDto.page_number,
      pageableDto.page_size,
      pageableDto.paged,
      pageableDto.unpaged,
      Sort.fromApiResponseDto(pageableDto.sort)
    );
  }
}

export default Pageable;
