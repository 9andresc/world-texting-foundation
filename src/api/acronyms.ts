import express, { NextFunction, Request, Response } from 'express'

import db from 'db/index'
import { Acronym } from 'db/interfaces/acronyms'
import { generateLinks } from 'helpers/pagination'
import { runValidation } from 'helpers/validation'
import access from 'middleware/access'
import acronymsService from 'services/acronyms'

const router = express.Router()

router.get('', async function getAcronyms(req: Request, res: Response, next: NextFunction) {
  const queryParams = (req.query as unknown) as {
    from?: number
    limit?: number
    search?: string
  }

  const schema = {
    $async: true,
    type: 'object',
    properties: {
      from: { type: 'number', default: 0, minimum: 0 },
      limit: { type: 'number', default: 10, minimum: 1 },
      search: { type: 'string', default: '' }
    }
  }

  try {
    await runValidation(queryParams, schema, { coerceTypes: true, useDefaults: true })
  } catch (error) {
    return next(error)
  }

  let acronyms: Acronym[]
  let total: number
  try {
    ;({ acronyms, total } = await acronymsService.getAcronyms({
      db,
      queryParams
    }))
  } catch (error) {
    return next(error)
  }

  const links = generateLinks(req.baseUrl, queryParams.from, queryParams.limit, queryParams, total)

  res.set('Link', links)
  res.status(200)
  res.send(acronyms.map((a) => ({ ...a, definitions: JSON.parse(String(a.definitions)) })))
})

router.get('/:acronym', async function getAcronym(req: Request, res: Response, next: NextFunction) {
  const params = (req.params as unknown) as { acronym: string }

  let acronym: Acronym
  try {
    acronym = await acronymsService.getAcronym({ db, params })
  } catch (error) {
    return next(error)
  }

  res.status(200)
  res.send({ ...acronym, definitions: JSON.parse(String(acronym.definitions)) })
})

router.post('', async function createAcronym(req: Request, res: Response, next: NextFunction) {
  const data = (req.body as unknown) as {
    acronym: string
    definitions: string[]
  }

  const schema = {
    $async: true,
    type: 'object',
    properties: {
      acronym: { type: 'string' },
      definitions: { type: 'array', items: { type: 'string' } }
    },
    required: ['acronym', 'definitions']
  }

  try {
    await runValidation(data, schema)
  } catch (error) {
    return next(error)
  }

  let acronym: Acronym
  try {
    acronym = await acronymsService.createAcronym({ db, data })
  } catch (error) {
    return next(error)
  }

  res.status(201)
  res.send({ ...acronym, definitions: JSON.parse(String(acronym.definitions)) })
})

router.put('/:acronym', [access], async function updateAcronym(req: Request, res: Response, next: NextFunction) {
  const params = (req.params as unknown) as { acronym: string }
  const data = (req.body as unknown) as {
    acronym: string
    definitions: string[]
  }

  const schema = {
    $async: true,
    type: 'object',
    properties: {
      acronym: { type: 'string' },
      definitions: { type: 'array', items: { type: 'string' } }
    }
  }

  try {
    await runValidation(data, schema)
  } catch (error) {
    return next(error)
  }

  let acronym: Acronym
  try {
    acronym = await acronymsService.updateAcronym({ db, params, data })
  } catch (error) {
    return next(error)
  }

  res.status(200)
  res.send({ ...acronym, definitions: JSON.parse(String(acronym.definitions)) })
})

router.delete('/:acronym', [access], async function updateAcronym(req: Request, res: Response, next: NextFunction) {
  const params = (req.params as unknown) as { acronym: string }

  let acronym: Acronym
  try {
    acronym = await acronymsService.deleteAcronym({ db, params })
  } catch (error) {
    return next(error)
  }

  res.status(204)
  res.send({ ...acronym, definitions: JSON.parse(String(acronym.definitions)) })
})

export default router
