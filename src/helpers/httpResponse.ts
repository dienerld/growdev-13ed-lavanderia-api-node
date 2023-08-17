export interface IHttpResponse {
  statusCode: number;
  body: any;
  success: boolean;
}

class HttpResponse {
  static badRequest(error: Error): IHttpResponse {
    return {
      statusCode: 400,
      body: {
        error: error.name,
        message: error.message,
      },
      success: false,
    };
  }

  static serverError(error: any): IHttpResponse {
    return {
      statusCode: 500,
      body: { error: error.name, message: error.message },
      success: false,
    };
  }

  static unauthorizedError(name: string, message: string): IHttpResponse {
    return {
      statusCode: 401,
      body: {
        error: name,
        message,
      },
      success: false,
    };
  }

  static ok<T>(data: T): IHttpResponse {
    return {
      statusCode: 200,
      body: data,
      success: true,
    };
  }

  static created<T>(data: T): IHttpResponse {
    return {
      statusCode: 201,
      body: data,
      success: true,
    };
  }

  static noContent(): IHttpResponse {
    return {
      statusCode: 204,
      body: undefined,
      success: true,
    };
  }
}

export { HttpResponse };
