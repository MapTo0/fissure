import {Router} from 'express'
import FriendsHandler from './../handlers/FrientsHandler'
const friendRouter = Router()

friendRouter.get('/:userId', FriendsHandler.getFriendListByUser)
friendRouter.get('/', FriendsHandler.searchFriendByName)
friendRouter.post('/', FriendsHandler.addFriendToUserFriendList)
friendRouter.delete('/:userId/:friend', FriendsHandler.removeFriendToUserFriendList)

export default friendRouter
