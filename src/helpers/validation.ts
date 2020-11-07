import Ajv from 'ajv'

import { ResponseError } from 'helpers/errors'

// eslint-disable-next-line @typescript-eslint/ban-types
async function runValidation(data: unknown, schema: boolean | object, options: unknown = {}): Promise<void> {
  const ajv = new Ajv(options)
  const validate = ajv.compile(schema)
  try {
    await validate(data)
  } catch (error) {
    throw new ResponseError('Validation error.', 400, error.errors)
  }
}

export { runValidation }
