export interface HttpReponse<T> {
  statusCode: number;
  body: T | string;
}
