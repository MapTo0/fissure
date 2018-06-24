import {Router} from 'express'
import FriendsHandler from './../handlers/FrientsHandler'
const friendRouter = Router()

friendRouter.get('/', FriendsHandler.getFriendListByUser)
friendRouter.get('/search/', FriendsHandler.searchFriendByName)
friendRouter.post('/', FriendsHandler.addFriendToUserFriendList)
friendRouter.delete('/:friend', FriendsHandler.removeFriendToUserFriendList)

export default friendRouter
