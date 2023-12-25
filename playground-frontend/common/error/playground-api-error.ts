import ProblemDetail from '../api/problem-detail';
import BasePlaygroundError from './base-playground-error';

/**
 * Error when trying to contact playground server
 */

type ErrorName =
  | 'AUTHENTICATION_ERROR' // user is not authenticated
  | 'AUTHORIZATION_ERROR' // user is not authorized
  | 'SERVER_ERROR' // 500 server error
  | 'UNKOWN_ERROR'; // generic error for errors not currently covered

class PlaygroundApiError extends BasePlaygroundError<ErrorName> {
  static async fromApiResponse(
    response: Response
  ): Promise<PlaygroundApiError> {
    const problemDetails: ProblemDetail = await response.json();

    switch (response.status) {
      case 500:
        return new PlaygroundApiError({
          name: 'SERVER_ERROR',
          message: problemDetails.title,
          cause: problemDetails.detail,
        });
      case 401:
        return new PlaygroundApiError({
          name: 'AUTHENTICATION_ERROR',
          message: problemDetails.title,
          cause: problemDetails.detail,
        });
      case 403:
        return new PlaygroundApiError({
          name: 'AUTHORIZATION_ERROR',
          message: problemDetails.title,
          cause: problemDetails.detail,
        });
      default: {
        return new PlaygroundApiError({
          name: 'UNKOWN_ERROR',
          message: problemDetails.title,
          cause: problemDetails.detail,
        });
      }
    }
  }
}

export default PlaygroundApiError;
