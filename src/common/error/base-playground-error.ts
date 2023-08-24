/** See https://engineering.udacity.com/handling-errors-like-a-pro-in-typescript-d7a314ad4991 */

interface Input<T extends string> {
  name: T;
  message: string;
  cause?: unknown;
}

class BasePlaygroundError<T extends string> extends Error {
  name: T;

  message: string;

  cause?: unknown;

  constructor(input: Input<T>) {
    super();
    this.name = input.name;
    this.message = input.message;
    this.cause = input.cause;
  }
}

export default BasePlaygroundError;
