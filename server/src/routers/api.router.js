import {Router} from 'express'
const apiRouter = Router()

apiRouter.get('/', (req, res) => {
  res.json({message: 'Hello world'})
})

apiRouter.get('/ping', (req, res) => {
  res.json({message: 'pong'})
})

export default apiRouter
