import { PageApiDtoResponse } from './page-api-response-dto';
import Pageable from './pageable';
import Sort from './sort';

class Page<T> {
  content: T[];
  totalPages: number;
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
  pageable: Pageable;
  sort: Sort;

  constructor(
    content: T[],
    totalPages: number,
    first: boolean,
    last: boolean,
    size: number,
    number: number,
    numberOfElements: number,
    empty: boolean,
    pageable: Pageable,
    sort: Sort
  ) {
    this.content = content;
    this.totalPages = totalPages;
    this.first = first;
    this.last = last;
    this.size = size;
    this.number = number;
    this.numberOfElements = numberOfElements;
    this.empty = empty;
    this.pageable = pageable;
    this.sort = sort;
  }

  static fromApiResponseDto<T>(pageDto: PageApiDtoResponse<T>): Page<T> {
    return new Page<T>(
      pageDto.content,
      pageDto.total_pages,
      pageDto.first,
      pageDto.last,
      pageDto.size,
      pageDto.number,
      pageDto.number_of_elements,
      pageDto.empty,
      Pageable.fromApiResponseDto(pageDto.pageable),
      Sort.fromApiResponseDto(pageDto.sort)
    );
  }

  static fromApiResponseDtoMutate<T, U>(
    pageDto: PageApiDtoResponse<U>,
    mutate: (content: U) => T
  ): Page<T> {
    return new Page<T>(
      pageDto.content.map((elem) => mutate(elem)),
      pageDto.total_pages,
      pageDto.first,
      pageDto.last,
      pageDto.size,
      pageDto.number,
      pageDto.number_of_elements,
      pageDto.empty,
      Pageable.fromApiResponseDto(pageDto.pageable),
      Sort.fromApiResponseDto(pageDto.sort)
    );
  }
}

export default Page;
