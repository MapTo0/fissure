import {Router} from 'express'
import activitiesHandler from './../handlers/ActivitiesHandler'

const activityRouter = Router()

activityRouter.get('/', activitiesHandler.getActivities)

export default activityRouter
