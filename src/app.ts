import * as dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'

dotenv.config()

import acronymsAPI from 'api/acronyms'
import miscAPI from 'api/misc'
import { ResponseError } from 'helpers/errors'

const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(express.json())

// API
app.use('/acronym', acronymsAPI)
app.use('/', miscAPI)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof ResponseError) {
    if (error.originalError) {
      console.error(error.originalError)
    }
    res.status(error.statusCode)
    res.send({ message: error.message })
  } else {
    console.error(error)
    res.status(500)
    res.send({ message: 'Internal server error.' })
  }
})

export default app
