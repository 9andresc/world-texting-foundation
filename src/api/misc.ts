import express, { NextFunction, Request, Response } from 'express'

import db from 'db/index'
import { Acronym } from 'db/interfaces/acronyms'
import { runValidation } from 'helpers/validation'
import miscService from 'services/misc'

const router = express.Router()

router.get('/random/:count', async function getRandomAcronyms(req: Request, res: Response, next: NextFunction) {
  const params = (req.params as unknown) as {
    count: number
  }

  const schema = {
    $async: true,
    type: 'object',
    properties: {
      count: { type: 'number', minimum: 0 }
    },
    required: ['count']
  }

  try {
    await runValidation(params, schema, { coerceTypes: true })
  } catch (error) {
    return next(error)
  }

  let randomAcronyms: Acronym[]
  try {
    randomAcronyms = await miscService.getRandomAcronyms({ db, count: params.count })
  } catch (error) {
    return next(error)
  }

  res.status(200)
  res.send(randomAcronyms.map((ra) => ({ ...ra, definitions: JSON.parse(String(ra.definitions)) })))
})

export default router
