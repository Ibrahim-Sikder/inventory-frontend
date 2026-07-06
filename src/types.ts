export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface IGenericErrorResponse {
  statusCode: number;
  message: string;
  errorMessages?: unknown;
}

export interface IGenericApiResponse<T> {
  data: T;
  meta?: IMeta;
  success?: boolean;
  message?: string;
}