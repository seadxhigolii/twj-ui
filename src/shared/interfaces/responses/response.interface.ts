export interface Response<T> {
    data: T;
    success: boolean;
    message?: string;
    statusCode: number;
  }
  