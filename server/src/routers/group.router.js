import {Router} from 'express'
import groupHandler from './../handlers/GroupsHandler'
const groupRouter = Router()

groupRouter.get('/', groupHandler.getGroups)
groupRouter.post('/', groupHandler.createGroup)

groupRouter.put('/:groupId', groupHandler.updateGroup)
groupRouter.get('/:groupId', groupHandler.findGroup)
groupRouter.post('/:groupId/members', groupHandler.addMemberToGroup)
groupRouter.put('/:groupId/members', groupHandler.removeMembersToGroup)

export default groupRouter
