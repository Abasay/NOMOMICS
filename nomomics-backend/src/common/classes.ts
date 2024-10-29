import HttpStatusCodes from '@src/common/HttpStatusCodes';

/**
 * Error with status code and message.
 */
export class RouteError extends Error {
  public status: HttpStatusCodes;
  public message2: string;

  public constructor(status: HttpStatusCodes, message: string, message2?: any) {
    super(message);
    this.status = status;
    this.message2 = message2;
  }
}

/**
 * If route validation fails.
 */
export class ValidationErr extends RouteError {
  public static MSG = 'The follow parameter were missing or invalid "';

  public constructor(paramName: string) {
    super(HttpStatusCodes.BAD_REQUEST, ValidationErr.GetMsg(paramName));
  }

  public static GetMsg(param: string) {
    return ValidationErr.MSG + param + '".';
  }
}
