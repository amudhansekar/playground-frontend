import { ZonedDateTime, parseAbsoluteToLocal } from "@internationalized/date";
import LivestreamApiResponseFullDto from "./livestream-api-response-full-dto";

interface Livestream {
  streamer: string;

  url: string;

  startDate: ZonedDateTime;

  endDate?: ZonedDateTime;
}

function convertLivestreamApiResponseFullDtoToLivestream(
  dto: LivestreamApiResponseFullDto
) {
  return {
    streamer: dto.streamer,
    url: dto.url,
    startDate: parseAbsoluteToLocal(dto.startDate),
    endDate: !dto.endDate ? undefined : parseAbsoluteToLocal(dto.endDate),
  };
}

export default Livestream;
export { convertLivestreamApiResponseFullDtoToLivestream };
