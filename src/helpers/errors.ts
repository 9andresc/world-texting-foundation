class ResponseError extends Error {
  public statusCode: number
  public data: unknown
  public originalError: Error

  constructor(message: string, statusCode: number, data?: unknown, originalError?: Error) {
    super(message)
    this.statusCode = statusCode
    this.data = data
    this.originalError = originalError
  }
}

export { ResponseError }
