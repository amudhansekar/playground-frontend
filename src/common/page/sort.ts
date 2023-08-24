import { SortApiResponseDto } from './page-api-response-dto';

class Sort {
  empty: boolean;

  sorted: boolean;

  unsorted: boolean;

  constructor(empty: boolean, sorted: boolean, unsorted: boolean) {
    this.empty = empty;
    this.sorted = sorted;
    this.unsorted = unsorted;
  }

  static fromApiResponseDto(sortDto: SortApiResponseDto): Sort {
    return new Sort(sortDto.empty, sortDto.sorted, sortDto.unsorted);
  }
}

export default Sort;
