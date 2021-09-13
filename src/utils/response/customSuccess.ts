import { response, Response } from 'express';

response.customResponse = function (httpStatusCode: number, message: string, data: any = null): Response {
  return this.status(httpStatusCode).json({ message, data });
};
