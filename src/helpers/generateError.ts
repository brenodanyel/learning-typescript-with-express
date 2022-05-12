export type customError = {
  status: number,
  customMessage: string,
  stack?: Error,
}

export default function generateError(err: customError) {
  const stack = new Error();
  return {
    ...err,
    stack,
  };
}
